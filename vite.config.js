import { copyFileSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://nevfeldeniz.github.io/Oldhome/
// Admin:         https://nevfeldeniz.github.io/Oldhome/admin
const BASE = '/Oldhome/'

// GitHub Pages SPA: 404 sonrası index'e yönlendirip React Router'ın /admin yolunu tanıması
const GH_PAGES_404 = `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <title>Old Home Guest House</title>
    <script>
      var segmentCount = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>`

const PATH_RESTORE_SCRIPT = `<script>
(function (l) {
  if (l.search[1] === '/') {
    var decoded = l.search
      .slice(1)
      .split('&')
      .map(function (s) { return s.replace(/~and~/g, '&'); })
      .join('?');
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
}(window.location));
</script>`

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'gh-pages-routes',
      transformIndexHtml(html) {
        return html.replace('<head>', `<head>\n    ${PATH_RESTORE_SCRIPT}`)
      },
      closeBundle() {
        const dist = resolve(__dirname, 'dist')
        const indexPath = resolve(dist, 'index.html')

        // /Oldhome/admin → admin/index.html (doğrudan açılır)
        const adminDir = resolve(dist, 'admin')
        mkdirSync(adminDir, { recursive: true })
        copyFileSync(indexPath, resolve(adminDir, 'index.html'))

        // Bilinmeyen alt yollar için SPA yönlendirmesi
        writeFileSync(resolve(dist, '404.html'), GH_PAGES_404, 'utf-8')
      },
    },
  ],
  base: BASE,
})
