# Jute Gunny Bags – Static Website

A fast, SEO-friendly, mobile-first static website for a jute gunny bag manufacturer and exporter based in India. Built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step, no backend.

---

## Project Structure

```
gunnybag/
├── public/                    ← All site files (Firebase "public" folder)
│   ├── index.html             ← Home page
│   ├── about.html
│   ├── products.html          ← Product catalogue listing
│   ├── certificates.html
│   ├── contact.html
│   ├── 404.html
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── products/
│   │   ├── heavy-duty-90-100kg.html
│   │   ├── coffee-cocoa-beans.html
│   │   ├── 50-60kg-grain-storage.html
│   │   └── nuts-cashew.html
│   └── assets/
│       ├── css/main.css       ← All styles (single file)
│       ├── js/
│       │   ├── config.js      ← ★ EDIT THIS — all business config
│       │   ├── main.js        ← Header/footer injection, nav, lightbox
│       │   ├── products.js    ← Product data rendering
│       │   └── form.js        ← Enquiry form handling
│       ├── data/
│       │   └── products.json  ← ★ Product data source
│       └── img/               ← ★ Replace placeholder SVGs with real photos
├── firebase.json
├── .firebaserc
├── serve.ps1                  ← Local dev server (PowerShell)
├── DEPLOY.md
└── README.md
```

---

## ★ Checklist: What You Still Need to Replace

### 1. Business Information — `public/assets/js/config.js`

Open `config.js` and fill in every value:

| Key | What to put |
|-----|-------------|
| `COMPANY_NAME` | Your actual company name |
| `TAGLINE` | Keep or customise |
| `EMAIL` | Your sales email address |
| `PHONE` | Your phone number with country code |
| `WHATSAPP` | WhatsApp number (digits only, e.g. `919876543210`) |
| `ADDRESS` | Full city, state, pin, India |
| `GST_NO` | Your GST registration number |
| `DOMAIN` | Your actual domain, e.g. `https://www.mycompany.com` |
| `FORM_ENDPOINT` | Formspree or Web3Forms URL (see Form Setup below) |
| `GOOGLE_MAP_EMBED` | Google Maps embed URL for your office |

**All these values propagate automatically** to every page, header, footer, JSON-LD, Open Graph tags and email links. You never need to edit any HTML file for contact information.

### 2. Product Images — `public/assets/img/`

Replace every SVG placeholder with your real product photos:

| File | Product / Use |
|------|--------------|
| `placeholder-hero.svg` | Hero background (1600×600 recommended) |
| `placeholder-product-1a/b/c.svg` | Heavy Duty Sacks (3 photos) |
| `placeholder-product-2a/b/c.svg` | Coffee & Cocoa Bags (3 photos) |
| `placeholder-product-3a/b/c.svg` | 50–60 kg Grain Sacks (3 photos) |
| `placeholder-product-4a/b/c.svg` | Nuts & Cashew Sacks (3 photos) |
| `placeholder-cert-1.svg` → `placeholder-cert-6.svg` | Certificate scans/images |
| `logo-placeholder.svg` | Your company logo |

**Naming convention:** Keep the exact filenames and simply overwrite the SVGs with your `.jpg`, `.webp` or `.png` images — then update the `src` attributes in the HTML and the `images` array in `products.json` to match the new extension.

### 3. Update `products.json` image references

After replacing images, edit `public/assets/data/products.json`:
```json
"images": ["my-product-1-front.jpg", "my-product-1-side.jpg", "my-product-1-detail.jpg"]
```

### 4. Sitemap domain — `public/sitemap.xml`

Replace all `https://yourdomain.com` occurrences with your real domain.

### 5. JSON-LD structured data — in each HTML `<head>`

Replace `"[Your Company Name]"` and `"https://yourdomain.com"` in every page's `<script type="application/ld+json">` block. (Once you deploy, consider using a script to do this in bulk, or just find-and-replace in your editor.)

### 6. Canonical URLs — in each HTML `<head>`

Update every `<link rel="canonical" href="...">` to use your real domain.

---

## How to Add or Edit Products

Products are defined in one place: **`public/assets/data/products.json`**.

Each product object has:
- `id` — URL slug (matches the product page filename, e.g. `heavy-duty-90-100kg`)
- `modelNo` — Model number shown on cards and pages
- `name` — Full product name
- `shortDesc` — One-line description shown on listing cards
- `longDesc` — Multi-paragraph description (separate paragraphs with `\n\n`)
- `moq` — Minimum order quantity string
- `images` — Array of 3 filenames from `/assets/img/`
- `specs` — Key-value object for the spec table
- `applications` — Array of use-case strings
- `customization` — Array of customization option strings
- `category` — Internal tag
- `relatedIds` — Array of 2 `id` values for the related products section

To **add a new product**:
1. Add an entry to `products.json`
2. Create a new HTML page in `public/products/` (copy an existing one and change `data-product-id` on `<body>`)
3. Add the product to the nav dropdown in `main.js` (search for `heavy-duty-90-100kg`)
4. Add the image files to `public/assets/img/`
5. Add the page URL to `sitemap.xml`

---

## Form Endpoint Setup

The enquiry form sends a JSON POST to `SITE_CONFIG.FORM_ENDPOINT`. If the endpoint is blank, it falls back to `mailto:`.

### Option A — Formspree (easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form → copy the endpoint URL (e.g. `https://formspree.io/f/abcdefgh`)
3. Paste it as `FORM_ENDPOINT` in `config.js`

### Option B — Web3Forms (free)
1. Sign up at [web3forms.com](https://web3forms.com)
2. Get your Access Key
3. Set `FORM_ENDPOINT: "https://api.web3forms.com/submit"`
4. Set `FORM_ACCESS_KEY: "your-access-key-here"`

### Option C — mailto fallback (zero setup)
Leave `FORM_ENDPOINT` empty. The form will open the user's email client with the form data pre-filled. Works everywhere, but requires the user to have an email client configured.

---

## Local Development

No build step needed. Serve the `public/` folder from any static server.

**Option 1 — PowerShell (no installs required):**
```powershell
.\serve.ps1
# Then open http://localhost:8080
```

**Option 2 — Firebase CLI:**
```bash
npm install -g firebase-tools
firebase serve
```

**Option 3 — VS Code Live Server extension:**
Right-click `public/index.html` → Open with Live Server

---

## Deployment

See **DEPLOY.md** for full Firebase Hosting deployment steps.
