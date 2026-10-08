// Tiny zero-dependency static server, so the app runs on a stable
// http://localhost origin instead of file:// — browsers keep localStorage
// far more reliably there. Run it with:  node server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 4321;
const ROOT = __dirname;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
                ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
                ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon" };

http.createServer((req, res) => {
  let url;
  try { url = decodeURIComponent(req.url.split("?")[0]); }
  catch { res.writeHead(400).end("Bad request"); return; }
  const rel = url === "/" ? "index.html" : url.replace(/^\/+/, "");
  const file = path.resolve(ROOT, rel);

  // never serve outside this folder, and never serve dotfiles/folders
  // (.git, .claude, .env, ...) or anything with a NUL byte in the path
  const inside = file.startsWith(ROOT + path.sep);
  const hidden = path.relative(ROOT, file).split(path.sep).some(part => part.startsWith("."));
  if (!inside || hidden || rel.includes("\0")) { res.writeHead(403).end("Forbidden"); return; }

  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found"); return; }
    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    }).end(buf);
  });
}).listen(PORT, "127.0.0.1", () => {
  console.log(`\n  Habits is running at  http://localhost:${PORT}\n  Press Ctrl+C to stop.\n`);
});
