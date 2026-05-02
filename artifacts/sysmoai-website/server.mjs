/**
 * Minimal production HTTP server for the SYSmoAI website.
 *
 * Serves the Vite-built static files from dist/public with proper
 * route-aware HTML serving:
 *   1. Static assets with extensions → serve directly (path-traversal safe).
 *   2. Clean route URLs → try dist/public/<route>/index.html first
 *      (page-specific meta baked in by generate-static.ts), then fall
 *      back to dist/public/index.html (SPA shell).
 *
 * Security: all request paths are decoded, normalized, and checked to remain
 * strictly inside DIST before any file is read. Requests that resolve outside
 * DIST are rejected with 403.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, 'dist', 'public');
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

/**
 * Safely resolve a URL path to an absolute filesystem path inside DIST.
 * Returns null if the resolved path would escape DIST (path traversal attempt).
 */
function safeResolve(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  // path.resolve collapses any .. or . components
  const resolved = path.resolve(DIST, '.' + decoded);
  // Ensure resolved path is inside DIST (must start with DIST + separator)
  if (resolved !== DIST && !resolved.startsWith(DIST + path.sep)) {
    return null;
  }
  return resolved;
}

function serveFile(res, filePath, contentType) {
  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
}

const server = http.createServer((req, res) => {
  try {
    const rawUrl = req.url || '/';
    const urlPath = rawUrl.split('?')[0];

    const ext = path.extname(urlPath);

    // 1. Static asset with a file extension
    if (ext) {
      const filePath = safeResolve(urlPath);
      if (!filePath) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const contentType = MIME[ext] || 'application/octet-stream';
        serveFile(res, filePath, contentType);
        return;
      }
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    // 2. Route URL (no extension) — try page-specific index.html first
    const cleanPath = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
    if (cleanPath) {
      const routeHtmlUrl = cleanPath + '/index.html';
      const routeHtmlPath = safeResolve(routeHtmlUrl);
      if (routeHtmlPath === null) {
        // Path traversal detected — reject explicitly rather than falling back
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      if (fs.existsSync(routeHtmlPath)) {
        serveFile(res, routeHtmlPath, 'text/html; charset=utf-8');
        return;
      }
    }

    // 3. SPA fallback — root index.html
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
