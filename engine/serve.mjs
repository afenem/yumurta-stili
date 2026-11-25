// serve.mjs — tiny static server rooted at the repo (ES modules do not load over file://).
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.wav': 'audio/wav', '.ttf': 'font/ttf', '.woff2': 'font/woff2' };
export function startServer(port = 0) {
  return new Promise(res => {
    const server = http.createServer((req, rsp) => {
      let pathname;
      try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
      catch { rsp.writeHead(400); rsp.end('Bad request'); return; }
      const p = path.resolve(ROOT, '.' + pathname);
      const relative = path.relative(ROOT, p);
      if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) {
        rsp.writeHead(404); rsp.end(); return;
      }
      rsp.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(p).pipe(rsp);
    });
    server.listen(port, '127.0.0.1', () => res({ server, port: server.address().port }));
  });
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { port } = await startServer(+process.argv[2] || 8123);
  console.log(`http://127.0.0.1:${port}/engine/index.html?story=is-odasi`);
}
