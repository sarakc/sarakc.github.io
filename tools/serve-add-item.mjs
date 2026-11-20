#!/usr/bin/env node
/* `npm run add-item`: serve the item editor on this machine and open it.

   The editor imports the type table from src/components/threads/types.mjs,
   and browsers refuse module imports from a page opened as a file, so it
   needs a server. This one listens on 127.0.0.1 only and serves only the
   editor's own files and the pure /threads modules it imports. It never
   touches items.json: the page opens and saves that through the browser's
   own file picker, as before. Ctrl-C stops it. */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, extname, sep } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ALLOWED = ['tools', 'src/components/threads'].map(dir => resolve(root, dir) + sep)
const TYPES = { '.html': 'text/html', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css' }
const PAGE = '/tools/add-item.html'
const PORT = Number(process.env.PORT) || 4178

const server = createServer(async (req, res) => {
  let path
  try { path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname) } catch { path = '' }
  if (path === '/') { res.writeHead(302, { location: PAGE }); res.end(); return }
  const file = resolve(root, '.' + path)
  const type = TYPES[extname(file)]
  if (req.method !== 'GET' || !type || !ALLOWED.some(dir => file.startsWith(dir))) {
    res.writeHead(404); res.end('not found'); return
  }
  try {
    const body = await readFile(file)
    res.writeHead(200, { 'content-type': `${type}; charset=utf-8`, 'cache-control': 'no-store' })
    res.end(body)
  } catch {
    res.writeHead(404); res.end('not found')
  }
})

function open(url) {
  if (process.env.NO_OPEN) return
  const [cmd, args] = process.platform === 'darwin' ? ['open', [url]]
    : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]]
      : ['xdg-open', [url]]
  spawn(cmd, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref()
}

function listen(port) {
  server.once('error', e => {
    /* Something else has the usual port: take any free one. */
    if (e.code === 'EADDRINUSE' && port !== 0) listen(0)
    else { console.error(e.message); process.exit(1) }
  })
  server.listen(port, '127.0.0.1', () => {
    const url = `http://127.0.0.1:${server.address().port}${PAGE}`
    console.log(`item editor at ${url}\nCtrl-C to stop`)
    open(url)
  })
}
listen(PORT)
