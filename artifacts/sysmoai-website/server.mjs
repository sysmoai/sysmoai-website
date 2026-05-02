/**
 * Minimal production HTTP server for the SYSmoAI website.
 *
 * Serves the Vite-built static files from dist/public with proper
 * route-aware HTML serving:
 *   1. Static assets with extensions → serve directly.
 *   2. Clean route URLs → try dist/public/<route>/index.html first
 *      (page-specific meta baked in by generate-static.ts), then fall
 *      back to dist/public/index.html (SPA shell).
 *
 * This replaces "vite preview" / the static-only serving for production so
 * that crawlers fetching /services/ai-sprint see unique title, canonical,
 * OG tags, and JSON-LD instead of the homepage defaults.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist', 'public');
const PORT = Number(process.env.PORT ?? 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

function serveFile(res, filePath, contentType) {
  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
}

const server = http.createServer((req, res) => {
  try {
    const rawUrl = req.url || '/';
    const urlPath = rawUrl.split('?')[0];

    // 1. Static asset with a file extension → serve directly
    const ext = path.extname(urlPath);
    if (ext) {
      const filePath = path.join(DIST, urlPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const contentType = MIME[ext] || 'application/octet-stream';
        serveFile(res, filePath, contentType);
        return;
      }
      // Asset not found → 404
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    // 2. Route URL (no extension) → try page-specific index.html first
    const cleanPath = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
    const routeHtml = path.join(DIST, cleanPath, 'index.html');
    if (cleanPath && fs.existsSync(routeHtml)) {
      serveFile(res, routeHtml, 'text/html; charset=utf-8');
      return;
    }

    // 3. SPA fallback → root index.html
    const rootHtml = path.join(DIST, 'index.html');
    serveFile(res, rootHtml, 'text/html; charset=utf-8');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`SYSmoAI website serving on http://0.0.0.0:${PORT}`);
});
