const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}

function utf8ToBase64(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

function githubHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'oldhome-publish-worker',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

async function getGitHubFileSha(env) {
  const owner = env.GITHUB_OWNER
  const repo = env.GITHUB_REPO
  const path = env.GITHUB_FILE_PATH || 'public/site-data.json'
  const branch = env.GITHUB_BRANCH || 'main'
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`

  const res = await fetch(url, { headers: githubHeaders(env.GITHUB_TOKEN) })
  if (res.status === 404) return null
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub dosya okunamadı (${res.status}): ${text}`)
  }

  const meta = await res.json()
  return meta.sha
}

async function commitToGitHub(env, jsonText) {
  const owner = env.GITHUB_OWNER
  const repo = env.GITHUB_REPO
  const path = env.GITHUB_FILE_PATH || 'public/site-data.json'
  const branch = env.GITHUB_BRANCH || 'main'
  const sha = await getGitHubFileSha(env)

  const body = {
    message: `Admin: site içeriği güncellendi (${new Date().toISOString()})`,
    content: utf8ToBase64(jsonText),
    branch,
  }
  if (sha) body.sha = sha

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      ...githubHeaders(env.GITHUB_TOKEN),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub kayıt başarısız (${res.status}): ${text}`)
  }
}

async function fetchGitHubSiteData(env) {
  const owner = env.GITHUB_OWNER
  const repo = env.GITHUB_REPO
  const path = env.GITHUB_FILE_PATH || 'public/site-data.json'
  const branch = env.GITHUB_BRANCH || 'main'
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`

  const res = await fetch(url, { headers: { 'User-Agent': 'oldhome-publish-worker' } })
  if (!res.ok) return null
  return res.text()
}

async function readSiteData(env) {
  const cached = await env.SITE_DATA.get('current')
  if (cached) return cached
  return fetchGitHubSiteData(env)
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS })
    }

    const url = new URL(request.url)

    if (url.pathname === '/site-data.json' && request.method === 'GET') {
      const data = await readSiteData(env)
      if (!data) {
        return jsonResponse({ error: 'Site verisi bulunamadı.' }, 404)
      }
      return new Response(data, {
        headers: {
          ...CORS,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      })
    }

    if (url.pathname === '/publish' && request.method === 'POST') {
      const auth = request.headers.get('Authorization') || ''
      const expected = `Bearer ${env.PUBLISH_SECRET || ''}`

      if (!env.PUBLISH_SECRET || auth !== expected) {
        return jsonResponse({ error: 'Yetkisiz istek.' }, 401)
      }

      if (!env.GITHUB_TOKEN) {
        return jsonResponse({ error: 'Worker: GITHUB_TOKEN tanımlı değil.' }, 500)
      }

      let jsonText
      try {
        const parsed = await request.json()
        jsonText = JSON.stringify(parsed, null, 2)
        JSON.parse(jsonText)
      } catch {
        return jsonResponse({ error: 'Geçersiz JSON verisi.' }, 400)
      }

      try {
        await env.SITE_DATA.put('current', jsonText)
        await commitToGitHub(env, jsonText)
        return jsonResponse({ ok: true, message: 'Canlı siteye kaydedildi.' })
      } catch (err) {
        return jsonResponse({ error: err.message || 'Yayınlama hatası.' }, 500)
      }
    }

    if (url.pathname === '/health' && request.method === 'GET') {
      return jsonResponse({ ok: true })
    }

    return jsonResponse({ error: 'Bulunamadı.' }, 404)
  },
}
