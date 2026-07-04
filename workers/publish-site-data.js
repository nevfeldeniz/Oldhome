/**
 * Cloudflare Worker — admin panelinden gelen site verisini GitHub'a yazar.
 * Tarayıcı CORS sınırını aşmak için bir kez deploy edilir.
 */

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(),
      'Content-Type': 'application/json',
    },
  })
}

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

async function updateGithubFile(env, jsonString) {
  const owner = env.GITHUB_OWNER
  const repo = env.GITHUB_REPO
  const branch = env.GITHUB_BRANCH || 'main'
  const path = env.FILE_PATH || 'public/site-data.json'
  const token = env.GITHUB_TOKEN

  if (!owner || !repo || !token) {
    throw new Error('Worker ortam değişkenleri eksik (GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN).')
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`
  const getRes = await fetch(getUrl, { headers })
  let sha
  if (getRes.ok) {
    sha = (await getRes.json()).sha
  } else if (getRes.status !== 404) {
    throw new Error(`GitHub okuma hatası: ${getRes.status}`)
  }

  const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Admin: site içeriği güncellendi',
      content: utf8ToBase64(jsonString),
      branch,
      ...(sha ? { sha } : {}),
    }),
  })

  if (!putRes.ok) {
    const details = await putRes.text()
    throw new Error(`GitHub yazma hatası: ${putRes.status} ${details}`)
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() })
    }

    const url = new URL(request.url)
    const auth = request.headers.get('Authorization') || ''
    const expected = `Bearer ${env.PUBLISH_SECRET || ''}`

    if (url.pathname.endsWith('/health')) {
      if (auth !== expected) return jsonResponse({ error: 'Yetkisiz' }, 401)
      return jsonResponse({ ok: true, repo: `${env.GITHUB_OWNER}/${env.GITHUB_REPO}` })
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Bulunamadı' }, 404)
    }

    if (auth !== expected) {
      return jsonResponse({ error: 'Yetkisiz' }, 401)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Geçersiz JSON gövdesi' }, 400)
    }

    if (!body?.data || typeof body.data !== 'object') {
      return jsonResponse({ error: 'data alanı gerekli' }, 400)
    }

    try {
      const jsonString = JSON.stringify(body.data, null, 2)
      await updateGithubFile(env, jsonString)
      return jsonResponse({ ok: true })
    } catch (err) {
      return jsonResponse({ error: err.message || 'Yayın hatası' }, 502)
    }
  },
}
