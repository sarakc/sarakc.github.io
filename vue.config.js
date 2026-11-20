const fs = require('fs')
const path = require('path')
const { defineConfig } = require('@vue/cli-service')

/* drafts/ is gitignored working material (PROJECT_MAP.md). In development the
   /threads page can preview a draft collection (?preview=…); the dev server
   hands those files out here. A missing folder or file is a plain 404, so a
   fresh clone serves fine without them. Builds never include drafts/. */
const DRAFTS = path.resolve(__dirname, 'drafts')
const DRAFT_FILE = /^threads-[a-z-]+(\.similarity)?\.json$/

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'sara court',
    },
  },
  devServer: {
    setupMiddlewares(middlewares, devServer) {
      devServer.app.get('/__drafts/:file', (req, res) => {
        const file = req.params.file
        const full = path.join(DRAFTS, file)
        if (!DRAFT_FILE.test(file) || !fs.existsSync(full)) { res.sendStatus(404); return }
        res.type('json').send(fs.readFileSync(full))
      })
      return middlewares
    },
  },
})
