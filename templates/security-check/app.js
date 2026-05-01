// WARNING: This code has intentional security vulnerabilities for learning purposes
const http = require('http');
const url = require('url');
const fs = require('fs');

const users = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // User search - vulnerable to injection
  if (parsedUrl.pathname === '/search') {
    const query = parsedUrl.query.q;
    const sql = "SELECT * FROM users WHERE name = '" + query + "'";
    console.log("Executing: " + sql);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Search results for: ' + query + '</h1>');
  }

  // File reader - vulnerable to path traversal
  if (parsedUrl.pathname === '/file') {
    const filename = parsedUrl.query.name;
    const content = fs.readFileSync('./data/' + filename, 'utf8');
    res.end(content);
  }

  // User registration - no input validation
  if (parsedUrl.pathname === '/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const user = JSON.parse(body);
      users.push(user);
      res.end('User ' + user.name + ' registered with password ' + user.password);
    });
  }

  // Admin panel - no authentication
  if (parsedUrl.pathname === '/admin') {
    res.end(JSON.stringify(users));
  }
});

server.listen(8080);
