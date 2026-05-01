"use client";

import { useState } from "react";

interface FileTreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileTreeNode[];
  size?: number;
  modified?: string;
}

function FileIcon({ type, name }: { type: "file" | "directory"; name: string }) {
  if (type === "directory") {
    return (
      <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
      </svg>
    );
  }

  const ext = name.split(".").pop()?.toLowerCase();
  const colorMap: Record<string, string> = {
    ts: "text-blue-400",
    tsx: "text-blue-400",
    js: "text-yellow-300",
    jsx: "text-yellow-300",
    html: "text-orange-400",
    css: "text-purple-400",
    json: "text-green-400",
    md: "text-gray-400",
    py: "text-green-300",
    txt: "text-gray-300",
  };

  return (
    <svg
      className={`w-4 h-4 ${colorMap[ext || ""] || "text-gray-400"} shrink-0`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function TreeNode({
  node,
  depth,
  isNew,
  onFileClick,
}: {
  node: FileTreeNode;
  depth: number;
  isNew: boolean;
  onFileClick?: (path: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-white/5 transition-colors ${
          isNew ? "file-new bg-accent/10" : ""
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (node.type === "directory") {
            setIsOpen(!isOpen);
          } else if (onFileClick) {
            onFileClick(node.path);
          }
        }}
      >
        {node.type === "directory" && (
          <svg
            className={`w-3 h-3 text-text-secondary transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {node.type === "file" && <span className="w-3" />}
        <FileIcon type={node.type} name={node.name} />
        <span className="text-sm truncate">{node.name}</span>
        {node.size !== undefined && (
          <span className="text-xs text-text-secondary ml-auto">
            {node.size < 1024
              ? `${node.size}B`
              : `${(node.size / 1024).toFixed(1)}KB`}
          </span>
        )}
      </div>
      {node.type === "directory" && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              isNew={false}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTree({
  tree,
  newFiles,
  onFileClick,
}: {
  tree: FileTreeNode[];
  newFiles: Set<string>;
  onFileClick?: (path: string) => void;
}) {
  if (tree.length === 0) {
    return (
      <div className="text-text-secondary text-sm text-center py-8">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        まだファイルがありません
        <br />
        <span className="text-xs">課題を始めてファイルを作成しましょう</span>
      </div>
    );
  }

  return (
    <div className="font-mono">
      {tree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          depth={0}
          isNew={newFiles.has(node.path)}
          onFileClick={onFileClick}
        />
      ))}
    </div>
  );
}
