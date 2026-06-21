# Yash Petkar Portfolio — Vite/React Version

A fast Vite + React portfolio customized for **Yash Petkar**, focused on AI in Business, business intelligence, analytics, full-stack systems, startup operations, and strategy.

## Customized sections

- Hero and splash screen rebranded to Yash Petkar.
- About section rewritten for AI + business positioning.
- Skills updated for AI, BI, full-stack, product strategy, and operations.
- Experience updated for Vmintus and independent project work.
- Projects updated for:
  - AI Business Intelligence Dashboard
  - Full-Stack Gym Management System
  - Vmintus Operations Engine
- Contact/social links moved into `src/data/portfolioData.js`.
- Profile image replaced with a neutral `YP` placeholder SVG.

## Before deploying

Update these placeholders in `src/data/portfolioData.js`:

```js
href: 'https://github.com/YOUR_GITHUB_USERNAME'
email: 'your-email@example.com'
phone: 'ADD_YOUR_PHONE'
resume: '#'
```

Replace `public/images/profile.svg` with your real profile photo when ready.

## Local setup

```bash
npm install
npm run dev
```

## Vercel deployment

1. Push this folder to GitHub.
2. Import the GitHub repo into Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
