# Olayinka Olaniran — Portfolio Website

A personal portfolio built with vanilla JavaScript, Tailwind CSS, and Vite. Showcases 5 assessment projects with an interactive skill-to-project graph, toggleable engineering notes, and a two-panel contact section. No frameworks — deliberately, to demonstrate core JS before the next project moves to React/TypeScript/Next.js.

**Live demo:** _add Netlify URL here_
**Repo:** https://github.com/Olayinka-Olaniran/Assessment_Project_9

---

## Features

- **Skill graph** — 9 verified techniques mapped to the 5 featured projects, with SVG-drawn connections that appear on hover (desktop) and are being extended to tap-to-reveal on mobile
- **Project cards** — each with a default overview and a toggleable "engineering notes" view (problem, key decision, challenge, hindsight)
- **Responsive nav** — sticky header, hamburger collapse on mobile
- **Contact form** — Netlify Forms integration with honeypot spam protection
- **Accessible skill descriptions** — click-to-expand disclosure pattern, not hover-only

See [`docs/PRD.md`](./docs/PRD.md) for full feature status (built / in progress / planned) and design decisions.

---

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) — styling
- Vanilla JavaScript (ES6 modules) — no framework
- [Netlify](https://www.netlify.com/) — hosting and form handling

---

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Install
```bash
git clone https://github.com/Olayinka-Olaniran/Assessment_Project_9.git
cd Assessment_Project_9
npm install
```

### Run locally
```bash
npm run dev
```
Opens a local dev server (default Vite port, usually `http://localhost:5173`).

### Build for production
```bash
npm run build
```
Outputs to `dist/`.

### Preview the production build
```bash
npm run preview
```

---

## Project Structure

```
Assessment_Project_9/
├── index.html
├── src/
│   ├── script.js
│   ├── styles.css
│   └── data/
│       ├── projectsMetadata.js   # the 5 project entries
│       └── skillGraphData.js     # the 9 skill entries
├── assets/
│   ├── images/                   # project screenshots/illustrations
│   └── icons/                    # tech icons, skill icons
├── docs/
│   ├── PRD.md
│   └── wireframes/                # low-fi SVG wireframes per section
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Data-Driven Content

Adding or editing a project only requires editing `src/data/projectsMetadata.js` — cards render automatically via `renderProjects()` in `script.js`. Same pattern for skills in `src/data/skillGraphData.js`; the `projects` array on each skill entry drives which SVG edges get drawn.

---

## Known Gaps (not yet built)

- Command palette (Ctrl+K)
- Contact form client-side validation and submit feedback
- Copy-to-clipboard email handler
- Print-friendly resume view
- Active-nav-link-on-scroll highlighting

Full detail and rationale for each in `docs/PRD.md` §7 and §9.

---

## License

_Add license here (or state "all rights reserved" if this stays personal/portfolio-only)._

---

## Contact

- Email: oolaniran853@gmail.com
- GitHub: [@Olayinka-Olaniran](https://github.com/Olayinka-Olaniran)
