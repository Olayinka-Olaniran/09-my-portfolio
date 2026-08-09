# Portfolio Website — Product Requirements Document (v2)

**Project:** Assessment_Project_9 (Final Vanilla JavaScript Project)
**Status:** In Development — Core structure and rendering built, interactive polish in progress
**Supersedes:** PRD v1 (2026-08-06)
**Author:** Olayinka Olaniran

---

## 1. Overview

A portfolio website showcasing 5 verified JavaScript projects, built with vanilla JS, Tailwind CSS, and Vite. The site centers on a skill-to-project mapping graph, toggleable engineering notes on each project card, and a two-panel contact section. No frameworks — this is a deliberate demonstration of core JavaScript before the next project (Assessment_Project_10+) moves to React/TypeScript/Next.js.

This version of the PRD reflects the site as actually built, not just as originally planned. Where v1 described something that was later built differently, this document describes the current decision and why it changed.

---

## 2. Target Audience

1. **Hiring managers / tech leads** — proof of capability in vanilla JS, async/await, DOM manipulation, form handling, localStorage, responsive design.
2. **Code reviewers** — want to see reasoning, not just feature lists (engineering notes toggle exists for this).
3. **Peers / mentors** — interested in the build journey.

---

## 3. Goals

### Primary
- Demonstrate technical capability across 5 real projects with live demos and source.
- Show problem-solving via "engineering notes" (problem, key decision, challenge, hindsight) on each project card.
- Map skill → project relationships visually via an interactive graph.
- Keep navigation simple and fast (4 sections, no dead ends).

### Secondary
- Small polish touches (copy-to-clipboard email, print-friendly output) — planned, not yet built.
- Accessibility: keyboard nav, contrast, semantic HTML, screen-reader support.

### Non-Goals
- Terminal-style typing intro
- Live GitHub stats/commit counters
- Blog/articles
- Testimonials (no references yet)
- A separate command palette is still a stated goal (see §7) but is not required for v1 launch — it can ship as a fast-follow.

---

## 4. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Build | Vite | Fast dev server, standard for static sites |
| Styling | Tailwind CSS | Utility-first, responsive by default |
| JavaScript | Vanilla ES6+ (modules) | Demonstrates core JS mastery, no framework |
| Hosting | Netlify | Free custom domain, git-push deploy, native form handling |
| Version control | Git, Conventional Commits | Professional history |

---

## 5. Design System (as built)

**This is a two-tone design, not light-primary-with-dark-accents.** The header, footer, and one half of the contact section are dark slate; Home/Skills/Portfolio sections are light. v1 undersold how much dark surface area the site actually uses — treat the two tones as equal partners, not primary/accent.

**Palette**
- Light surfaces: `white`, `slate-50`
- Dark surfaces: `slate-900`, `slate-800`, `slate-700` (header gradient, footer, contact right panel)
- Accent: `orange-500` / `orange-400` — links, buttons, active states
- Secondary text: `slate-600` / `slate-300` (context-dependent on light/dark surface)
- Borders: `slate-200` / `slate-300` (light), `white/10` (dark)

**Typography**
- Headings: bold sans-serif, high contrast
- Body: 16px base
- Links: orange accent, hover transition

**Layout**
- Container: responsive, no hard max-width lock observed in current build (verify against final Tailwind config)
- Grid: 1 col mobile → 2 col tablet → 3 col desktop for project cards
- Skill graph: 3-column grid (`grid-cols-[30%_40%_30%]` mobile, `grid-cols-[15%_70%_15%]` desktop)

---

## 6. Navigation (as built)

**4 links, not 5.** Home absorbs what was originally planned as a separate Hero + About split. This was a deliberate consolidation, not a placeholder.

1. Home (Hero + About combined)
2. Skills
3. Portfolio
4. Contact

Sticky header, gradient dark background, hamburger collapse on mobile with slide-down `hidden`/`flex` toggle and auto-close on link click.

---

## 7. Core Features

### 7.1 Home Section — ✅ Built
Headline, intro copy, secondary paragraph, two CTAs (View Portfolio / Get In Touch), stat row (5 projects / 9 skills / JS foundation).

### 7.2 Skills Section & Graph — 🟡 Partially built
- ✅ 9 verified skill nodes with click-to-expand descriptions (`aria-expanded` toggle, works without a mouse)
- ✅ SVG edge-drawing between skill and project nodes on desktop hover
- ✅ `overflow: visible` fix on `#graph-svg` so edges don't clip at different breakpoints
- ✅ Fade-on-hover: non-connected skill/project nodes dim to reduce visual noise from lines crossing near unrelated nodes
- 🔲 Mobile tap-to-reveal (drafted, not yet merged with the existing accordion click handler — see Known Issues)
- 🔲 Click-a-technique → scroll to its first project
- 🔲 Click-a-project → highlight its techniques

**Verified skill → project mapping (9 skills, matches implementation):**
| Skill | Projects |
|---|---|
| Form Validation | 04, 07 |
| localStorage Persistence | 04, 06 |
| Custom Expression Parser | 03 |
| API / Fetch | 08 |
| Modal Dialogs | 03, 04, 07 |
| Array Methods (map/filter) | 04 |
| DOM Manipulation | 03, 04, 06, 07 |
| Async/Await | 08 |
| Event Delegation | 04, 06 |

### 7.3 Portfolio Section — ✅ Built
`renderProjects()` builds all 5 cards from `projectsMetadata.js`. Each card has:
- Default view: image, title, short description, tech/tag badges, Demo + GitHub buttons
- Engineering notes view: Problem / Key Decision / Challenge / Hindsight
- Toggle between views via two buttons per card, event-delegated on the grid container (single listener, not per-card)

**The 5 projects (unchanged from v1, verified against source):**
| # | Project | Real Features |
|---|---|---|
| 03 | Utility Calculator + BMI | Custom expression parser with operator precedence, no `eval()`, BMI modal |
| 04 | Student Record System | Tabbed UI, edit-in-place records, live search filter, auto report-card generation |
| 06 | Theme Switcher | 6 full themes, toggle + dropdown, localStorage persistence |
| 07 | Quiz App | Data-driven via ES6 module, per-category timers, question jump buttons, custom dialogs |
| 08 | Weather App | Open-Meteo API, explicit state machine (Idle → Loading → Success/Error), °F/°C toggle, timeout handling |

### 7.4 Contact Section — 🟡 Partially built
- ✅ Correct Netlify wiring: hidden `form-name` input, honeypot field, `data-netlify="true"` + `netlify` attribute (more robust than v1's simplified example)
- ✅ Two-panel layout: form (left) + dark info panel (right) with stat block and social/email links
- 🔲 Submit handling, client-side validation, and status messaging not yet in `script.js`
- 🔲 Copy-to-clipboard button exists in markup with no click handler
- ⚠️ Right info panel is `hidden md:flex` — mobile visitors see the bare form only, no stats/email/social. Confirm this is intentional before launch.

### 7.5 Command Palette (Ctrl+K) — 🔲 Not built
No DOM element, no JS. Deferred; not required for v1 launch (see §3 Non-Goals note).

### 7.6 Polish features — 🔲 Not built
- Print-friendly resume (`window.print()` + print stylesheet)
- Active-nav-link-on-scroll highlighting

---

## 8. Data Structure Templates

### `src/data/projectsMetadata.js`
```javascript
export const projects = [
  {
    id: '03',
    title: 'Project Title',
    shortDescription: '1–2 sentence summary',
    fullDescription: 'Longer description',
    technologies: ['Tech 1', 'Tech 2'],
    image: '/assets/images/03-project-name.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_3/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_3',
    engineeringNotes: {
      problem: '...',
      keyDecision: '...',
      challenge: '...',
      hindsight: '...'
    },
    skillsUsed: ['skill-id-1', 'skill-id-2']
  }
];
```

### `src/data/skillGraphData.js`
```javascript
export const skills = [
  {
    id: 'kebab-case-id',
    name: 'Skill Display Name',
    projects: ['03', '04'],
    description: 'One-line description.'
  }
];
```

---

## 9. Known Issues / Open Threads

1. **Mobile skill graph interaction** — a `matchMedia('(hover: hover) and (pointer: fine)')` gate has been drafted to split desktop hover vs mobile tap so the two never bind simultaneously (avoids the synthetic-mouseenter-before-click issue on touchscreens). Still needs to be merged with the existing `.skill-toggle` accordion click handler so tap-to-show-graph and tap-to-expand-description share one state instead of drifting apart.
2. **Mobile contact panel** — right info panel is fully hidden below `md`. Decide whether to surface a condensed version (e.g. just email + social icons) on mobile instead of dropping it entirely.
3. **Placeholder content** — footer/contact social links (GitHub, LinkedIn, Twitter) are generic URLs; `mailto:` is a placeholder; `<head>` meta tags (`og:title`, `og:url`, etc.) are generic. All need real values before deploy.

---

## 10. Accessibility Requirements

- Keyboard navigation: all interactive elements reachable via Tab, Enter, Arrow keys, Esc (where applicable)
- Color contrast: WCAG AA (4.5:1 normal text, 3:1 large text)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`
- Alt text on all images
- Skill node descriptions already use accessible disclosure pattern (`aria-expanded`) rather than hover-only

---

## 11. Deployment Checklist

- [ ] Netlify form test submission
- [ ] Replace all placeholder URLs and emails
- [ ] Build command verified: `npm run build`
- [ ] Cross-browser check (Chrome, Firefox, Safari, mobile)
- [ ] Lighthouse pass (performance ≥90, accessibility ≥95, SEO ≥90)

---

**Document status:** Reflects build as of this update. Update again once command palette, form handling, and mobile graph interaction ship.
