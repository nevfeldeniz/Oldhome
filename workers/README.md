# Canlı Yayın Worker (bir kez kurulur)

Admin panelindeki **Değişiklikleri Kaydet ve Yayınla** butonu, site verisini bu worker üzerinden GitHub'a yazar.

## Kurulum

1. [Cloudflare](https://dash.cloudflare.com/) hesabı açın (ücretsiz).
2. Bilgisayarınızda Node.js kuruluysa:

```bash
cd workers
npm install -g wrangler
wrangler login
wrangler secret put GITHUB_TOKEN
wrangler secret put PUBLISH_SECRET
wrangler deploy
```

3. `GITHUB_TOKEN`: GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained token**
   - Repository: `Oldhome`
   - Permissions: **Contents: Read and write**

4. `PUBLISH_SECRET`: Güçlü bir şifre seçin (ör. rastgele 32 karakter). Admin panelinde de aynısını kullanacaksınız.

5. Deploy sonrası verilen URL'yi kopyalayın (ör. `https://oldhome-publish.xxx.workers.dev`).

## Siteye bağlama (tüm admin kullanıcıları için otomatik)

GitHub repo → **Settings → Secrets and variables → Actions** bölümüne ekleyin:

| Secret | Değer |
|--------|--------|
| `VITE_PUBLISH_API_URL` | Worker URL |
| `VITE_PUBLISH_SECRET` | PUBLISH_SECRET ile aynı şifre |

Sonra projeyi push edin. Artık admin panelinde tek tuşla yayın çalışır; diğer kullanıcıların ayrıca ayar yapmasına gerek kalmaz.

Alternatif: Ayarlar panelinden API adresi ve şifreyi elle girebilirsiniz (yalnızca o tarayıcıda geçerli).
