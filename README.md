# Logesh Kannan — Portfolio (React + Vite)

Frontend for the Logesh Kannan portfolio site, built with React and Vite.
Deploys to Vercel. The contact form talks to a separate backend API
(`backend_portfolio` repo) deployed on Render.

## Project Structure

```
frontend_portfolio/
├── index.html
├── vite.config.js
├── eslint.config.js
├── .env.example              ← VITE_API_URL for the contact form
├── public/
│   ├── assets/                 ← images, project screenshots, certificates
│   └── myproject/              ← standalone static sub-project pages
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css              ← all site styles
    ├── data.js                ← content: skills, education, projects, certs
    ├── hooks/
    │   └── useReveal.js       ← scroll-reveal animation
    └── components/
        ├── Nav.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Education.jsx
        ├── Projects.jsx
        ├── Certificates.jsx   ← includes the certificate modal
        ├── Contact.jsx        ← form validation + submit logic
        ├── Footer.jsx
        └── ScrollTop.jsx
```

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run lint
```

## Contact form API URL

`src/components/Contact.jsx` reads `VITE_API_URL` at build time:

```
VITE_API_URL=https://your-render-service.onrender.com/api/contact
```

Set this as an environment variable in your Vercel project settings (or copy
`.env.example` to `.env.production` locally). Without it, the app falls back
to `http://localhost:5000/api/contact` on `localhost` and a placeholder URL
otherwise — so set it before your production deploy.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On Vercel: **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist` — Vercel fills these in automatically.
4. Add `VITE_API_URL` as an environment variable before deploying.
5. Deploy. Your site goes live at `https://<project>.vercel.app`.
6. Make sure the backend's `ALLOWED_ORIGIN` (Render) includes this domain.
