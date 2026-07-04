/** Canlı yayın hedefi — GitHub Pages reposu */
export const PUBLISH_TARGET = {
  owner: import.meta.env.VITE_GITHUB_OWNER || 'nevfeldeniz',
  repo: import.meta.env.VITE_GITHUB_REPO || 'Oldhome',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
  filePath: 'public/site-data.json',
}

export function getLiveSiteDataUrl(cacheBust = true) {
  const { owner, repo, branch, filePath } = PUBLISH_TARGET
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`
  return cacheBust ? `${base}?t=${Date.now()}` : base
}
