# Canlı Yayınlama (Cloudflare Worker)

Admin panelindeki **«Değişiklikleri Kaydet ve Yayınla»** butonu bu Worker üzerinden çalışır.
Tek seferlik kurulumdan sonra personel yalnızca admin panelini kullanır.

## 1. GitHub token

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**
2. Yeni token: yalnızca `Oldhome` deposu, **Contents: Read and write**
3. Token'ı kopyalayın

## 2. Cloudflare Worker

1. [cloudflare.com](https://dash.cloudflare.com/) ücretsiz hesap
2. Bilgisayarda:

```powershell
cd workers
npm install -g wrangler
wrangler login
npx wrangler kv namespace create SITE_DATA
```

`wrangler.toml` içindeki `REPLACE_WITH_KV_NAMESPACE_ID` satırlarını komutun verdiği id ile değiştirin.

```powershell
wrangler secret put GITHUB_TOKEN
wrangler secret put PUBLISH_SECRET
wrangler deploy
```

`PUBLISH_SECRET`: güçlü bir şifre (ör. rastgele 32 karakter). Admin sitesinde de aynısı kullanılacak.

Deploy sonrası URL örneği: `https://oldhome-publish.xxx.workers.dev`

## 3. GitHub repo secrets

Depo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret | Değer |
|--------|--------|
| `VITE_PUBLISH_API_URL` | Worker URL (ör. `https://oldhome-publish.xxx.workers.dev`) |
| `VITE_PUBLISH_SECRET` | `PUBLISH_SECRET` ile aynı |
| `VITE_SITE_DATA_URL` | Worker URL + `/site-data.json` |

Ardından GitHub Desktop ile push yapın veya Actions'tan workflow'u yeniden çalıştırın.

## Test

```powershell
curl https://oldhome-publish.xxx.workers.dev/health
```

Admin panelinde değişiklik yapıp **Değişiklikleri Kaydet ve Yayınla**'ya basın. Canlı site birkaç saniye içinde güncellenir.
