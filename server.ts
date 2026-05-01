import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { WebSocketServer, WebSocket } from "ws";
import chokidar from "chokidar";
import fs from "fs";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const PROJECT_ROOT = process.cwd();
const WORKSPACE_ROOT = path.join(PROJECT_ROOT, "workspace");
const TEMPLATES_ROOT = path.join(PROJECT_ROOT, "templates");

interface FileTreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileTreeNode[];
  size?: number;
  modified?: string;
}

function buildFileTree(dirPath: string, relativeTo: string): FileTreeNode[] {
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const nodes: FileTreeNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;

    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.relative(relativeTo, fullPath);

    if (entry.isDirectory()) {
      nodes.push({
        name: entry.name,
        path: relPath,
        type: "directory",
        children: buildFileTree(fullPath, relativeTo),
      });
    } else {
      const stats = fs.statSync(fullPath);
      nodes.push({
        name: entry.name,
        path: relPath,
        type: "file",
        size: stats.size,
        modified: stats.mtime.toISOString(),
      });
    }
  }

  return nodes.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === "directory" ? -1 : 1;
  });
}

function checkVerification(
  workingDir: string,
  verification: { type: string; path: string; content?: string; count?: number }
): boolean {
  const fullPath = path.join(workingDir, verification.path);

  switch (verification.type) {
    case "file_exists":
      return fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
    case "dir_exists":
      return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
    case "file_contains":
      if (!fs.existsSync(fullPath)) return false;
      const content = fs.readFileSync(fullPath, "utf-8");
      return content.includes(verification.content || "");
    case "file_count":
      if (!fs.existsSync(fullPath)) return false;
      const files = fs.readdirSync(fullPath);
      return files.length >= (verification.count || 0);
    default:
      return false;
  }
}

function copyDirSync(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function rmDirSync(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Resolve workspace dir safely
function resolveWorkspaceDir(lessonId: string): string | null {
  // Sanitize: only allow simple alphanumeric + hyphens
  if (!/^[a-zA-Z0-9-]+$/.test(lessonId)) return null;
  const dir = path.join(WORKSPACE_ROOT, lessonId);
  if (!dir.startsWith(WORKSPACE_ROOT)) return null;
  return dir;
}

function readBody(req: import("http").IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

app.prepare().then(() => {
  const upgrade = app.getUpgradeHandler();

  const server = createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);

    // API: Start a lesson (copy template → workspace)
    if (parsedUrl.pathname === "/api/lesson/start" && req.method === "POST") {
      const body = JSON.parse(await readBody(req));
      const { lessonId } = body;
      const workDir = resolveWorkspaceDir(lessonId);
      const templateDir = path.join(TEMPLATES_ROOT, lessonId);

      if (!workDir || !templateDir.startsWith(TEMPLATES_ROOT)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid lesson ID" }));
        return;
      }

      if (!fs.existsSync(templateDir)) {
        // No template = just create empty dir
        fs.mkdirSync(workDir, { recursive: true });
      } else if (!fs.existsSync(workDir)) {
        // Copy template only if workspace doesn't exist yet
        copyDirSync(templateDir, workDir);
      }
      // If workspace already exists, keep it as-is (don't overwrite progress)

      const tree = buildFileTree(workDir, workDir);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, tree }));
      return;
    }

    // API: Reset a lesson (delete workspace, re-copy template)
    if (parsedUrl.pathname === "/api/lesson/reset" && req.method === "POST") {
      const body = JSON.parse(await readBody(req));
      const { lessonId } = body;
      const workDir = resolveWorkspaceDir(lessonId);
      const templateDir = path.join(TEMPLATES_ROOT, lessonId);

      if (!workDir || !templateDir.startsWith(TEMPLATES_ROOT)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid lesson ID" }));
        return;
      }

      // Delete existing workspace
      rmDirSync(workDir);

      // Re-copy template
      if (fs.existsSync(templateDir)) {
        copyDirSync(templateDir, workDir);
      } else {
        fs.mkdirSync(workDir, { recursive: true });
      }

      const tree = buildFileTree(workDir, workDir);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, tree }));
      return;
    }

    // API: get file tree for a lesson
    if (parsedUrl.pathname === "/api/filetree" && req.method === "GET") {
      const lessonId = parsedUrl.query.lessonId as string;
      if (!lessonId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "lessonId parameter required" }));
        return;
      }

      const workDir = resolveWorkspaceDir(lessonId);
      if (!workDir) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid lesson ID" }));
        return;
      }

      const tree = buildFileTree(workDir, workDir);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ tree }));
      return;
    }

    // API: verify a lesson step
    if (parsedUrl.pathname === "/api/verify" && req.method === "POST") {
      const body = JSON.parse(await readBody(req));
      const { lessonId, verification } = body;
      const workDir = resolveWorkspaceDir(lessonId);

      if (!workDir) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid lesson ID" }));
        return;
      }

      const passed = checkVerification(workDir, verification);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ passed }));
      return;
    }

    // API: read file content
    if (parsedUrl.pathname === "/api/file" && req.method === "GET") {
      const lessonId = parsedUrl.query.lessonId as string;
      const filePath = parsedUrl.query.path as string;

      if (!lessonId || !filePath) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "lessonId and path required" }));
        return;
      }

      const workDir = resolveWorkspaceDir(lessonId);
      if (!workDir) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid lesson ID" }));
        return;
      }

      const fullPath = path.join(workDir, filePath);
      if (!fullPath.startsWith(workDir)) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Access denied" }));
        return;
      }

      if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "File not found" }));
        return;
      }

      const content = fs.readFileSync(fullPath, "utf-8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ content, path: filePath }));
      return;
    }

    await handle(req, res, parsedUrl);
  });

  // Let Next.js handle HMR WebSocket upgrades
  server.on("upgrade", (req, socket, head) => {
    upgrade(req, socket, head);
  });

  // File watcher WebSocket on separate port
  const wsPort = port + 1;
  const wss = new WebSocketServer({ port: wsPort });
  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    clients.add(ws);
    ws.on("close", () => clients.delete(ws));
  });

  function broadcast(data: object) {
    const message = JSON.stringify(data);
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }

  // Ensure directories exist
  if (!fs.existsSync(WORKSPACE_ROOT)) {
    fs.mkdirSync(WORKSPACE_ROOT, { recursive: true });
  }

  // Watch workspace for changes
  const watcher = chokidar.watch(WORKSPACE_ROOT, {
    ignored: /(^|[\/\\])\.|node_modules/,
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on("all", (event, filePath) => {
    const relativePath = path.relative(WORKSPACE_ROOT, filePath);
    broadcast({
      type: "file-change",
      event,
      path: relativePath,
      timestamp: new Date().toISOString(),
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> WebSocket: ws://${hostname}:${wsPort}`);
    console.log(`> Templates: ${TEMPLATES_ROOT}`);
    console.log(`> Workspace: ${WORKSPACE_ROOT}`);
  });
});
