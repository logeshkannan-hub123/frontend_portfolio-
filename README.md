# Logesh Kannan — Portfolio Folder Structure

```
portfolio/
│
├── index.html                          ← Main entry point
│
├── css/
│   └── style.css                       ← All styles (nav, hero, about, skills, education, projects, certificates, contact, responsive)
│
├── js/
│   └── main.js                         ← All JavaScript (hamburger, scroll-to-top, reveal animation, active nav)
│
├── assets/
│   ├── images/
│   │   ├── My-image.png                ← Your profile photo (used in hero ring)
│   │   └── about-work.jpg              ← About section image
│   │
│   ├── projectimages/
│   │   ├── sample_website.png          ← Service Company Website screenshot
│   │   ├── resturent.png               ← Restaurant Menu screenshot
│   │   ├── Juiceshop.png               ← Juice Shop screenshot
│   │   ├── Construction_project.png    ← Design Agency screenshot
│   │   ├── Birthday_invitation.png     ← Birthday Invitation screenshot
│   │   └── MovieProject.png            ← Movie Range screenshot
│   │
│   └── certificates/
│       ├── whatsapp-chatbot.jpg        ← WhatsApp API Chatbot certificate
│       ├── youth-seminar.jpg           ← International Youth Seminar certificate
│       ├── india75-quiz.jpg            ← India @75 Quiz certificate
│       ├── project-published.jpg       ← Project Published certificate
│       ├── travel-management.jpg       ← Travel & Management certificate
│       └── tcs-career-edge.jpg         ← TCS Career Edge certificate
│
└── public/
    ├── about/
    │   └── (reserved for about page assets or expanded about section)
    │
    ├── contact/
    │   └── (reserved for contact page assets or backend form handler)
    │
    └── myproject/
        ├── birthday_invitation.html    ← Birthday Invitation project page
        ├── movies.html                 ← Movie Range project page
        └── designagency/
            └── index.html              ← Design Agency project page
```

---

## How to Use

1. Open `index.html` in your browser — everything is linked relatively, so no server needed.
2. Replace placeholder images in `assets/images/` with your real photos.
3. Add project screenshots to `assets/projectimages/` using the filenames listed above.
4. Add certificate images to `assets/certificates/` if you want to show them visually.
5. Add your individual project HTML files inside `public/myproject/`.

## Notes
- All image tags in `index.html` use `onerror` fallback — if an image file is missing, the emoji placeholder shows automatically.
- The `css/style.css` and `js/main.js` paths are relative to `index.html` at the root.

---

## 🚀 Deploy to Vercel

This is a plain static site — no build step required.

1. Push this repo to GitHub as `frontend_portfolio`.
2. On Vercel: **New Project** → import the repo.
3. Framework preset: **Other**. Leave build command empty; Vercel serves the
   repo root as static files.
4. Deploy. Your site goes live at `https://<project>.vercel.app`.
5. Before deploying, make sure `js/contact.js` → `RENDER_API_URL` points to
   your deployed backend (see the `backend_portfolio` repo), and that the
   backend's `ALLOWED_ORIGIN` includes this Vercel domain.

`vercel.json` in this repo sets basic security headers and long-term caching
for `/assets/*`.
