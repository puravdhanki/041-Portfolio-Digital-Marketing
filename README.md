# Purav Dhanki — Digital Marketing & Operations Portfolio

Personal portfolio of **Purav Dhanki**, Digital Marketing & Operations professional based in Mumbai. Built as a fast, dependency-free static site and deployed on Vercel.

[![Live on Vercel](https://img.shields.io/badge/Live-purav--portfolio--one.vercel.app-000000?logo=vercel&logoColor=white)](https://purav-portfolio-one.vercel.app/)
[![GitHub repo](https://img.shields.io/badge/GitHub-041--Portfolio--Digital--Marketing-181717?logo=github)](https://github.com/puravdhanki/041-Portfolio-Digital-Marketing)

| | |
|---|---|
| **Live site** | https://purav-portfolio-one.vercel.app/ |
| **Source code** | https://github.com/puravdhanki/041-Portfolio-Digital-Marketing |
| **Hosting** | Vercel project `purav-portfolio`, connected to this repo |

---

## What's on the site

- **Hero & profile** — role summary, availability status, quick contact and social profiles.
- **Skills** — four capability pillars:
  - Content & Video Production Ops (incl. Video Quality Control / QC)
  - SEO & Organic Traffic Strategy
  - Performance Marketing & Paid Ads (Meta Ads, Google Ads) — *currently learning*
  - AI Marketing & Productivity
- **Toolkit** — brand-logo grids for the AI tools I use (ChatGPT, Gemini, Claude, Copilot, Perplexity, Canva AI, Midjourney, CapCut AI, Meta AI, Grammarly, ElevenLabs) and the social platforms I manage (Instagram, Facebook, YouTube, LinkedIn, X, Threads, WhatsApp Business, Pinterest, Snapchat, Telegram).
- **Featured project** — *Large-Scale Video & Social Media Content Engine* (PulseX Media): 80+ member team, task allocation, 12-point QA/QC, 100% on-time delivery.
- **Experience** — Operations Team Leader (PulseX Media Solutions) and Customer Operations (Epicenter Technologies, Best Performer Aug 2025).
- **Certifications & education** — IIDE, Simplilearn (Prompt Engineering with GitHub Copilot), Office Master & Be10x, Great Learning; B.Sc. IT (University of Mumbai).
- **ROI / ROAS calculator** — interactive campaign estimator.
- **Contact** — email, phone, WhatsApp, contact form and social links.
- **Resume** — in-page resume viewer plus PDF download.

## Design & UX

- Clean SaaS-style UI: Geist typeface, zinc neutrals, one teal accent, soft layered card shadows.
- Light theme by default with a dark mode toggle (remembered per visitor).
- Subtle motion: hero entrance, scroll reveal, hover lift. Motion is disabled for visitors who prefer reduced motion.
- Fully responsive from 320px phones to wide desktops; full-screen mobile menu below 1100px.
- Accessible focus states, ARIA labels on icon links and the menu toggle.

## Social profiles

- LinkedIn — [linkedin.com/in/purav-dhanki](https://www.linkedin.com/in/purav-dhanki/)
- Instagram — [@puravdhanki](https://www.instagram.com/puravdhanki/) · [@purav.verse](https://www.instagram.com/purav.verse/)
- Facebook — [Purav Dhanki](https://www.facebook.com/purav.dhanki.96)
- GitHub — [puravdhanki](https://github.com/puravdhanki)

---

## Tech stack

Plain **HTML5, CSS3 and vanilla JavaScript**. No framework, no build step.

- Fonts: Geist & Geist Mono (Google Fonts)
- Icons: Font Awesome 6 + brand logos from [Simple Icons](https://simpleicons.org/) (stored locally in `assets/icons/`)
- Contact form backend: optional Google Apps Script template (`google_apps_script_backend.js`)

## Project structure

```
041 Portfolio Digital Marketing/
├── index.html                      # Page markup, SEO/Open Graph meta, all sections & modals
├── style.css                       # Base layout and component styles
├── theme-pro.css                   # SaaS theme layer: colors, type, cards, nav, motion, responsive fixes
├── script.js                       # Theme toggle, mobile menu, scroll reveal, counters, calculator, form
├── assets/icons/                   # Brand SVG logos (Simple Icons)
├── google_apps_script_backend.js   # Optional Google Sheets lead-capture backend
├── Purav_Dhanki_Resume.pdf         # Downloadable resume
├── Purav_Dhanki_Resume.docx
└── README.md
```

---

## Run locally

Any static file server works. For example:

```bash
npx http-server -p 8080 -c-1
```

Then open http://localhost:8080.

## Deployment (GitHub → Vercel)

The Vercel project **`purav-portfolio`** is connected to this GitHub repository with **`main`** as the production branch.

- **Push to `main`** → Vercel automatically builds and deploys to production at https://purav-portfolio-one.vercel.app/
- **Push any other branch / open a pull request** → Vercel creates a preview deployment with its own URL.

Typical workflow:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

Vercel settings: Framework preset **Other**, no build command, output directory **`.`** (repository root).

---

## Contact

- **Name:** Purav Dhanki
- **Location:** Mira Road, Mumbai, Maharashtra
- **Email:** puravdhanki@hotmail.com
- **Phone / WhatsApp:** +91 81089 01069
- **Portfolio:** https://purav-portfolio-one.vercel.app/
