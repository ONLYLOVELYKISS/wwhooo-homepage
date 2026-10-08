// Static file server used by the browser suite. Mirrors the production Nginx
// rule so the tests exercise the same resolution the site actually uses:
//
//   location / { try_files $uri $uri/ =404; }
//   error_page 404 /404.html;
//
// Lives under test/helpers/ so `node --test` (which only picks up *.test.mjs)
// does not try to run it as a suite.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
};

async function resolveFile(root, pathname) {
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const direct = join(root, safe);
  try {
    const info = await stat(direct);
    if (info.isFile()) return direct;
    if (info.isDirectory()) {
      const index = join(direct, 'index.html');
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    /* not found: fall through to 404.html, as `error_page 404` would */
  }
  return null;
}

/** Start the server on an ephemeral port. Resolves to { url, close }. */
export async function startStaticServer(root) {
  const server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');
    const file = await resolveFile(root, pathname);

    if (!file) {
      const body = await readFile(join(root, '404.html'));
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      res.end(body);
      return;
    }

    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
