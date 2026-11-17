# Firebase Hosting Deployment Guide

This site is configured for Firebase Hosting. All site files live in `public/`.

---

## Prerequisites

- A Google account
- A Firebase project (create one free at [console.firebase.google.com](https://console.firebase.google.com))
- Node.js installed (for the Firebase CLI)

---

## Step 1 — Install the Firebase CLI

```bash
npm install -g firebase-tools
```

Verify:
```bash
firebase --version
```

---

## Step 2 — Log In

```bash
firebase login
```

This opens a browser window to authenticate with your Google account.

---

## Step 3 — Set Your Project ID

Edit `.firebaserc` at the workspace root and replace the placeholder:

```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

You can find your project ID in the Firebase console URL: `console.firebase.google.com/project/YOUR-ID/...`

---

## Step 4 — Deploy

```bash
firebase deploy --only hosting
```

The CLI will upload everything in `public/` and print your hosting URL:

```
✔  Deploy complete!
Hosting URL: https://your-project-id.web.app
```

---

## Step 5 — Connect a Custom Domain

1. In the [Firebase console](https://console.firebase.google.com), go to **Hosting → Add custom domain**
2. Enter your domain (e.g. `www.yourcompany.com`)
3. Firebase will give you two DNS records to add:
   - An **A record** pointing `yourcompany.com` to Firebase's IPs
   - A **CNAME** pointing `www.yourcompany.com` to your Firebase project
4. Add these records in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
5. Firebase automatically provisions an SSL certificate via Let's Encrypt (can take up to 24 h)

After connecting your domain:
- Update `DOMAIN` in `public/assets/js/config.js`
- Update `<link rel="canonical">` on each HTML page
- Update all `https://yourdomain.com` in `public/sitemap.xml`

---

## Preview Channels (Test Before Going Live)

Deploy to a temporary preview URL without touching production:

```bash
firebase hosting:channel:deploy preview
```

This creates a URL like `https://your-project-id--preview-XXXXXX.web.app` valid for 7 days. Share it for review before promoting to live.

To promote a preview channel to production:

```bash
firebase hosting:channel:deploy preview --expires 7d
# then, after review:
firebase hosting:clone your-project-id:preview your-project-id:live
```

---

## GitHub Actions Auto-Deploy (Optional)

Add this file to your repo as `.github/workflows/deploy.yml` to automatically deploy on every push to `main`:

```yaml
# .github/workflows/deploy.yml
# Requires a GitHub secret: FIREBASE_SERVICE_ACCOUNT_<PROJECT_ID>
# Generate it in Firebase console → Project Settings → Service Accounts → Generate new private key
# Then add it in GitHub → Settings → Secrets → Actions → New repository secret

name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_YOUR_PROJECT_ID }}'
          channelId: live
          projectId: your-firebase-project-id
```

**Setup steps:**
1. In Firebase console → Project Settings → Service Accounts → Generate new private key → download JSON
2. In GitHub repo → Settings → Secrets and variables → Actions → New repository secret
3. Name: `FIREBASE_SERVICE_ACCOUNT_YOUR_PROJECT_ID` (replace with your actual project ID, uppercase, hyphens become underscores)
4. Value: paste the full contents of the downloaded JSON file
5. Update `projectId:` in the workflow file

---

## Caching Headers (already configured)

`firebase.json` sets:
- `/assets/**` → `Cache-Control: public, max-age=31536000, immutable` (1 year — images, CSS, JS)
- `**/*.html` → `Cache-Control: no-cache, must-revalidate` (always fresh)

This gives you fast repeat visits while ensuring HTML changes propagate immediately.

---

## Security Headers (already configured)

All responses include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`
