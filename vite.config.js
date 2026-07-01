import { copyFileSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SEO, getCanonicalUrl, getOgImageUrl } from './src/config/seo.js'

// GitHub Pages: https://nevfeldeniz.github.io/Oldhome/
const BASE = '/Oldhome/'

const GH_PAGES_404 = `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <title>Sayfa Bulunamadı | Old Home Guest House</title>
    <meta name="description" content="Aradığınız sayfa bulunamadı. Old Home Guest House ana sayfasına dönün." />
    <link rel="canonical" href="${SEO.siteUrl}/" />
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: system-ui, -apple-system, sans-serif;
        background: #f5efe3;
        color: #33272b;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      header, footer {
        padding: 1rem 1.5rem;
        background: #faf6ec;
        border-bottom: 1px solid rgba(110, 43, 61, 0.08);
      }
      footer { border-top: 1px solid rgba(110, 43, 61, 0.08); border-bottom: none; text-align: center; font-size: 0.875rem; color: rgba(51, 39, 43, 0.55); margin-top: auto; }
      main {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 1.5rem;
        text-align: center;
      }
      .eyebrow { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #6e2b3d; font-weight: 600; }
      h1 { font-family: Georgia, serif; font-size: clamp(1.75rem, 4vw, 2.25rem); color: #511f2c; margin-top: 1rem; }
      p { margin-top: 1rem; line-height: 1.65; color: rgba(51, 39, 43, 0.7); max-width: 32rem; }
      .actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
      a.btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-size: 0.875rem;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s;
      }
      .btn-primary { background: #511f2c; color: #fff; }
      .btn-primary:hover { background: #6e2b3d; }
      .btn-outline { border: 1px solid rgba(110, 43, 61, 0.3); color: #511f2c; background: rgba(250, 246, 236, 0.6); }
    </style>
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
  <body>
    <header><a href="${BASE}" style="color:#511f2c;font-weight:600;text-decoration:none;">Old Home Guest House</a></header>
    <main>
      <article>
        <p class="eyebrow">404</p>
        <h1>Sayfa bulunamadı</h1>
        <p>Aradığınız sayfa taşınmış veya silinmiş olabilir. Ana sayfaya dönerek devam edebilirsiniz.</p>
        <div class="actions">
          <a class="btn btn-primary" href="${BASE}">Ana Sayfaya Dön</a>
        </div>
      </article>
    </main>
    <footer>© ${new Date().getFullYear()} Old Home Guest House</footer>
  </body>
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

function injectSeo(html) {
  const canonical = getCanonicalUrl('/')
  const ogImage = getOgImageUrl()

  return html
    .replace(/__SEO_TITLE__/g, SEO.title)
    .replace(/__SEO_DESCRIPTION__/g, SEO.description)
    .replace(/__SEO_THEME_COLOR__/g, SEO.themeColor)
    .replace(/__SEO_CANONICAL__/g, canonical)
    .replace(/__SEO_SITE_NAME__/g, SEO.siteName)
    .replace(/__SEO_OG_TITLE__/g, SEO.ogTitle)
    .replace(/__SEO_OG_DESCRIPTION__/g, SEO.ogDescription)
    .replace(/__SEO_OG_IMAGE__/g, ogImage)
    .replace(/__SEO_OG_IMAGE_WIDTH__/g, String(SEO.ogImageWidth))
    .replace(/__SEO_OG_IMAGE_HEIGHT__/g, String(SEO.ogImageHeight))
    .replace(/__SEO_OG_IMAGE_ALT__/g, SEO.ogImageAlt)
    .replace(/__SEO_TWITTER_TITLE__/g, SEO.twitterTitle)
    .replace(/__SEO_TWITTER_DESCRIPTION__/g, SEO.twitterDescription)
    .replace(/__BASE_PATH__/g, BASE)
}

function generateSitemap() {
  const lastmod = new Date().toISOString().split('T')[0]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${getCanonicalUrl('/')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
}

function generateRobots() {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/

Sitemap: ${getCanonicalUrl('/')}sitemap.xml
`
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'seo-and-gh-pages',
      transformIndexHtml(html) {
        return injectSeo(html.replace('<head>', `<head>\n    ${PATH_RESTORE_SCRIPT}`))
      },
      closeBundle() {
        const dist = resolve(__dirname, 'dist')
        const indexPath = resolve(dist, 'index.html')

        const adminDir = resolve(dist, 'admin')
        mkdirSync(adminDir, { recursive: true })
        copyFileSync(indexPath, resolve(adminDir, 'index.html'))

        writeFileSync(resolve(dist, '404.html'), GH_PAGES_404, 'utf-8')
        writeFileSync(resolve(dist, 'sitemap.xml'), generateSitemap(), 'utf-8')
        writeFileSync(resolve(dist, 'robots.txt'), generateRobots(), 'utf-8')
      },
    },
  ],
  base: BASE,
})
