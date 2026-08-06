# Portfolio Website — Product Requirements Document

**Project:** Assessment_Project_9 (Final Vanilla JavaScript Project)  
**Status:** In Development  
**Last Updated:** 2026-08-06  
**Author:** Olayinka Olaniran

---

## 1. Overview

A **professional portfolio website** showcasing 5 verified JavaScript projects with interactive navigation, a skill-mapping visualization, and detailed project insights. This portfolio brings all verified work into one cohesive narrative with a skill graph that explains *which* techniques were used *where*, and project cards that surface real engineering decisions alongside shipping artifacts.

**Unique value proposition:** Instead of forcing visitors to jump between GitHub, live demos, and LinkedIn, the portfolio centralizes proof of capability with intentional navigation (command palette), real problem-solving context (engineering notes), and technique mapping (skill graph).

---

## 2. Target Audience

1. **Hiring managers / Tech leads** — Need proof of capability in vanilla JS, async/await, DOM manipulation, form handling, localStorage, and responsive design.
2. **Code reviewers** — Want to see thoughtful decision-making and problem-solving, not just feature lists (hence "engineering notes" toggle).
3. **Peers / Mentors** — Looking to give feedback or understand the project-building journey (dev-log visibility in presentation notes).

---

## 3. Goals

### Primary
- **Demonstrate technical capability** — 5 real, verifiable projects with working live demos and open-source code.
- **Show problem-solving approach** — "Engineering notes" on each project articulate problem, key decision, challenge faced, and hindsight.
- **Make navigation intentional** — Command palette (Ctrl+K) turns discovery into a deliberate user action, not passive scrolling.
- **Map skill → project** — Skill graph shows which techniques are used across which projects, making hiring relevance explicit.

### Secondary
- **Polish and personality** — Small touches (copy-to-clipboard, print-friendly layout, smooth animations) signal attention to detail.
- **Honest growth narrative** — Commit history progression (sparse early, more thoughtful later) visible in presentation notes.
- **Accessibility** — Keyboard nav, color contrast, semantic HTML, screen-reader friendly.

### Non-Goals
- Terminal-style typing intro (overdone, distracting)
- Live GitHub stats / commit counters (API limits, too much noise)
- Blog / Medium articles (out of scope)
- Testimonials section (no references yet)

---

## 4. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Build** | Vite | Modern, fast dev server; modern standard for static sites |
| **Styling** | Tailwind CSS | Utility-first, responsive by default, minimal custom CSS |
| **JavaScript** | Vanilla (ES6+) | No frameworks; showcases core JS mastery |
| **Hosting** | Netlify | Free custom domain, git-push deploy, native form handling |
| **Version Control** | Git (Conventional Commits) | Professional commit history |

**No frameworks.** This is a feature, not a limitation — it demonstrates deep JavaScript knowledge.

---

## 5. Design System

### Color Scheme

**Primary Palette:**
- **Background**: `#ffffff` (white) or `#f8fafc` (slate-50)
- **Dark areas**: `#0f172a` (slate-900)
- **Accent**: `#f97316` (orange-500) — matches existing project card SVG aesthetic
- **Secondary text**: `#64748b` (slate-500)
- **Borders**: `#e2e8f0` (slate-200)

**Tailwind Classes:**
```
bg-white, bg-slate-50, bg-slate-900
text-slate-900, text-slate-500, text-white
border-slate-200, border-slate-600
bg-orange-500, hover:bg-orange-600, text-orange-500
```

**Gradient (Header):**
```html
class="bg-gradient-to-r from-slate-900 to-slate-700"
```

### Typography

- **Headings (H1–H3):** Sans-serif, bold, high contrast
- **Body text:** 16px base, 1.5 line-height for readability
- **Code/monospace:** `font-mono` for technical snippets
- **Links:** Orange accent (`text-orange-500`) with underline on hover

### Spacing & Layout

- **Container:** max-width 1280px (lg breakpoint)
- **Sections:** Vertical rhythm with consistent padding (1.5rem/2rem/3rem)
- **Grid:** Responsive (1 col mobile, 2 col tablet, 3 col desktop for projects)

---

## 6. Core Features

### 6.1 Responsive Navigation
- **Desktop:** Horizontal navbar with logo (left) and nav links (right)
- **Mobile:** Logo (left), hamburger icon (right)
- **Active state:** Current section link highlighted in orange
- **Smooth scroll:** Clicking nav links scrolls to section (no page reload)

**Sections linked:**
1. Hero
2. Portfolio
3. Skills
4. About
5. Contact

---

### 6.2 Hero Section
- **Headline:** "Full-Stack JavaScript Developer" with short tagline
- **CTA button:** "Explore My Work" (orange, hover state darker orange)
- **Background:** Subtle gradient or neutral pattern (not distracting)
- **Copy-to-clipboard:** Email icon + tooltip ("Copy email"); clicking adds checkmark confirm

---

### 6.3 Projects Grid
**Layout:** 3 columns (desktop), 2 columns (tablet), 1 column (mobile)

**Default View:**
- Project screenshot (SVG embedded)
- Project title
- Short description (1–2 sentences)
- Tech badges (HTML5, CSS3, JavaScript, API, localStorage, etc.)
- Buttons: [View Demo] [GitHub]

**Engineering Notes Toggle (Second View):**
- Same card, same image
- Hidden by default; toggle to reveal:
  - **Problem:** What did it solve? (1–2 sentences)
  - **Key Decision:** A technical choice made and why (1–2 sentences)
  - **Challenge:** What was hard? (1–2 sentences)
  - **Hindsight:** What I'd change with experience? (1–2 sentences)

---

### 6.4 Contact Form
- **Fields:** Name, Email, Message (all required)
- **Validation:** 
  - Client-side: non-empty, valid email format
  - Show error message inline if invalid
- **Submission:**
  - Uses Netlify Forms (add `netlify` attribute to `<form>`)
  - On success: Show "Message sent!" toast (green, auto-dismiss 3s)
  - On failure: Show "Failed to send. Try again." (red)

---

## 7. Signature Features (Build Priority Order)

### 7.1 Command Palette (Ctrl+K)
**Purpose:** Structural navigation layer — primary way to jump between sections.

**Behavior:**
- Press **Ctrl+K** (or Cmd+K on Mac) → overlay appears
- Modal with search box (dark background)
- Shows all available commands (sections, projects by name, quick actions)
- **Search:** Type to filter commands in real-time
- **Arrow keys:** Up/Down navigate; selected item highlighted in orange
- **Enter:** Execute selected command (scroll to section, open demo, etc.)
- **Esc:** Close palette

**Commands:**
- Navigate to Hero (`H`)
- Navigate to Portfolio (`P`)
- Navigate to Skills (`S`)
- Navigate to About (`A`)
- Navigate to Contact (`C`)
- Jump to Project: [Project name] for each of 5 projects
- Open GitHub profile (`G`)
- Copy email to clipboard (`E`)

---

### 7.2 Project Card Engineering Notes Toggle
**Purpose:** Surface real problem-solving, not just features.

**Implementation:**
- Add toggle button to each project card
- Clicking toggles between default view and engineering-notes view
- Smooth fade/slide transition
- Content from `projectsMetadata.js`

---

### 7.3 Skill/Technique Graph
**Purpose:** Show *which* techniques are used in *which* projects.

**Visual Design:**
- Interactive graph/network diagram (SVG)
- Nodes: techniques (circles, labeled)
- Edges: connections to projects (thin lines)

**Techniques** (verified from actual code):
1. Form Validation → Projects: 04, 07
2. localStorage Persistence → Projects: 04, 06
3. Custom Expression Parser → Project: 03
4. API/Fetch → Project: 08
5. Modal Dialogs → Projects: 03, 04, 07
6. Array Methods (map/filter) → Project: 04
7. DOM Manipulation → Projects: 03, 04, 06, 07
8. Async/Await → Project: 08
9. Event Delegation → Projects: 04, 06

**Interactions:**
- **Hover a technique:** Highlight that technique, fade non-connected projects
- **Click a technique:** Scroll to first project using that technique
- **Click a project:** Highlight all techniques used in that project
- **Mobile:** Tap behavior (no hover); swipe to browse

---

## 8. Polish Features

### 8.1 Copy-to-Clipboard Email
- Small icon (envelope or copy icon, 20×20px) next to email
- On hover: Tooltip appears ("Copy email address")
- On click: Email copied to clipboard, icon changes to checkmark (green)
- After 2 seconds: Icon reverts to original
- Fallback: If clipboard API unavailable, show alert

### 8.2 Print-Friendly Resume / Resume Generation
- Subtle "Print Resume" button in footer or About section
- Clicking triggers `window.print()`
- Print stylesheet (`@media print`) hides nav, hero, skills, footer
- Shows: Name, summary, 5 projects (title + description + link), contact info

---

## 9. The 5 Projects — Verified Real Features

| # | Project | Real Features |
|---|---|---|
| **03** | Utility Calculator + BMI | Full calculator (custom expression parsing, operator precedence) + BMI modal. No eval(). |
| **04** | Student Record System | Tabbed UI, edit-in-place table records, live search filtering, auto report-card generation with letter grades. |
| **06** | Theme Switcher | 6 full themes (Light, Dark, Fire, Water, Earth, Wind), each with complete color palette. Toggle button + dropdown. localStorage persistence. |
| **07** | Quiz App | Data-driven from `quizData.js` ES6 module. Categories: HTML, CSS, JavaScript. Per-category timers, question jump buttons, custom dialogs. |
| **08** | Weather App | Real API integration (Open-Meteo), state machine (Idle → Loading → Success/Error), °F/°C toggle, timeout handling. |

---

## 10. Data Structure Templates

### 10.1 `src/data/projectsMetadata.js`

```javascript
export const projects = [
  {
    id: '03',
    title: 'Utility Calculator + BMI',
    shortDescription: 'A full-featured calculator with custom expression parsing and a built-in BMI calculator in a modal.',
    fullDescription: 'Handles arithmetic (+, −, ×, ÷) with proper operator precedence using custom string parsing (no eval()). Includes a separate BMI calculation mode accessed via a modal dialog.',
    technologies: ['JavaScript', 'DOM Manipulation', 'Modal Dialogs', 'Custom Parser'],
    image: '/assets/images/03-utility-calculator-bmi.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_3/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_3',
    engineeringNotes: {
      problem: 'Built a calculator that could handle multi-operation expressions with correct operator precedence without relying on eval() for security and learning reasons.',
      keyDecision: 'Implemented a custom string parser that evaluates expressions recursively, respecting order of operations. This showcases algorithmic thinking.',
      challenge: 'Getting operator precedence right (multiplication/division before addition/subtraction) required careful recursion logic.',
      hindsight: 'A proper lexer/parser library would have been overkill here, but understanding how parsing works at this level is valuable foundational knowledge.'
    },
    skillsUsed: ['Custom Expression Parser', 'DOM Manipulation', 'Modal Dialogs', 'Event Handling']
  },
  {
    id: '04',
    title: 'Student Record System',
    shortDescription: 'Tabbed records manager with live search, editable student data, and automatic report card generation.',
    fullDescription: 'Add, update, and delete student records inline in a table. Live search filters by name. Automatic calculation of totals and averages. Generate per-student report cards with letter grades and personalized remarks based on performance.',
    technologies: ['JavaScript', 'Form Validation', 'localStorage', 'Array Methods', 'DOM Manipulation'],
    image: '/assets/images/04-student-record-system.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_4/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_4',
    engineeringNotes: {
      problem: 'Needed to build an editable table that could handle multiple data states (new, edit, saved) with input validation and live filtering, all persisted to localStorage.',
      keyDecision: 'Used inline edit-in-place for records rather than a modal form — more intuitive for a data-entry tool.',
      challenge: 'Preventing invalid input (numbers in age/score fields) without blocking legitimate edits required blocking specific key codes (e, E, +, -) on number inputs.',
      hindsight: 'Input type="number" has built-in restrictions, but I added extra guards for a tighter UX. Balancing permissiveness and validation is hard to get right first try.'
    },
    skillsUsed: ['Form Validation', 'localStorage Persistence', 'Array Methods', 'DOM Manipulation', 'Event Delegation']
  },
  {
    id: '06',
    title: 'Theme Switcher',
    shortDescription: '6-theme UI switcher (Light, Dark, Fire, Water, Earth, Wind) with persistent user preference.',
    fullDescription: 'Dynamic theming system with 6 fully-fledged color palettes. Switch themes via toggle button or dropdown. User preference saved to localStorage and restored on page load.',
    technologies: ['JavaScript', 'CSS Custom Properties', 'localStorage', 'DOM Manipulation'],
    image: '/assets/images/06-theme-switcher.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_6/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_6',
    engineeringNotes: {
      problem: 'Wanted to show that theming isn\'t just light/dark toggle — built 6 cohesive color palettes each with subtle mood and purpose.',
      keyDecision: 'Stored themes as a JavaScript array of color objects, applying them to CSS custom properties at runtime rather than swapping CSS class names.',
      challenge: 'Ensuring all 6 themes had enough contrast for accessibility and visual distinction.',
      hindsight: 'This approach scales well; adding new themes is as simple as adding an object to the array without touching CSS.'
    },
    skillsUsed: ['CSS Custom Properties', 'localStorage Persistence', 'DOM Manipulation', 'Object Iteration']
  },
  {
    id: '07',
    title: 'Quiz App',
    shortDescription: 'Timed, category-based quiz with HTML/CSS/JavaScript topics, data-driven from a reusable config file.',
    fullDescription: 'Select a category (HTML, CSS, or JavaScript), answer timed questions with instant feedback, navigate via numbered jump buttons. All questions and feedback live in a separate data file (quizData.js), making the app reusable.',
    technologies: ['JavaScript', 'ES6 Modules', 'Event Handling', 'Modal Dialogs', 'Form Validation'],
    image: '/assets/images/07-quiz-app.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_7/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_7',
    engineeringNotes: {
      problem: 'Needed a quiz tool where new questions could be added without touching the app logic — a true data-driven design.',
      keyDecision: 'Separated quiz engine (logic, timing, navigation) from quiz content (questions, answers, feedback). Data lives in quizData.js as an ES6 export.',
      challenge: 'Handling the countdown timer and auto-submit when time runs out required careful state management.',
      hindsight: 'This data-driven approach is a real skill — seeing the boundary between engine and content is how you build reusable tools.'
    },
    skillsUsed: ['ES6 Modules', 'Event Handling', 'Custom Modal Dialogs', 'Timer/Interval Management', 'Array Iteration']
  },
  {
    id: '08',
    title: 'Weather App',
    shortDescription: 'Real-time weather lookup using Open-Meteo API with state machine error handling and °F/°C toggle.',
    fullDescription: 'Select a location, fetch live weather data, toggle between Celsius and Fahrenheit. Explicit state machine handles Idle → Loading → Success/Error flow with distinct UI per state.',
    technologies: ['JavaScript', 'Async/Await', 'Fetch API', 'Error Handling', 'State Machine Pattern'],
    image: '/assets/images/08-weather-app.svg',
    demoUrl: 'https://olayinka-olaniran.github.io/Assessment_Project_8/',
    repoUrl: 'https://github.com/Olayinka-Olaniran/Assessment_Project_8',
    engineeringNotes: {
      problem: 'Building a real-time app meant handling network delays, timeouts, and partial failures gracefully without leaving the UI stuck in a loading state.',
      keyDecision: 'Implemented a strict state machine (Idle → Loading → Success/Error) where only valid state transitions are allowed. This makes the UI predictable.',
      challenge: 'Implementing proper timeout handling (AbortController) so a hung request doesn\'t lock up the interface.',
      hindsight: 'State machines feel like overkill for simple apps, but they\'re the foundation of robust UIs. Learned that lesson here.'
    },
    skillsUsed: ['Async/Await', 'Fetch API', 'AbortController', 'Error Handling', 'State Machine Pattern', 'API Integration']
  }
];
```

### 10.2 `src/data/skillGraphData.js`

```javascript
export const skills = [
  {
    id: 'form-validation',
    name: 'Form Validation',
    category: 'User Input',
    icon: '/assets/icons/form-validation.svg',
    projects: ['04', '07'],
    description: 'Client-side validation of form inputs before submission.'
  },
  {
    id: 'localstorage',
    name: 'localStorage Persistence',
    category: 'Storage',
    icon: '/assets/icons/localstorage.svg',
    projects: ['04', '06'],
    description: 'Saving and retrieving user data in the browser.'
  },
  {
    id: 'custom-parser',
    name: 'Custom Expression Parser',
    category: 'Algorithm',
    icon: '/assets/icons/custom-parser.svg',
    projects: ['03'],
    description: 'Parsing and evaluating string expressions with operator precedence.'
  },
  {
    id: 'fetch-api',
    name: 'API / Fetch',
    category: 'Networking',
    icon: '/assets/icons/fetch-api.svg',
    projects: ['08'],
    description: 'Making HTTP requests and handling responses asynchronously.'
  },
  {
    id: 'modal-dialogs',
    name: 'Modal Dialogs',
    category: 'UI Components',
    icon: '/assets/icons/modal-dialogs.svg',
    projects: ['03', '04', '07'],
    description: 'Native and custom modal/dialog components for focused interactions.'
  },
  {
    id: 'array-methods',
    name: 'Array Methods (map/filter)',
    category: 'JavaScript',
    icon: '/assets/icons/array-methods.svg',
    projects: ['04'],
    description: 'Functional array operations for transforming collections.'
  },
  {
    id: 'dom-manipulation',
    name: 'DOM Manipulation',
    category: 'JavaScript',
    icon: '/assets/icons/dom-manipulation.svg',
    projects: ['03', '04', '06', '07'],
    description: 'Selecting, creating, and modifying HTML elements dynamically.'
  },
  {
    id: 'async-await',
    name: 'Async/Await',
    category: 'JavaScript',
    icon: '/assets/icons/async-await.svg',
    projects: ['08'],
    description: 'Writing asynchronous code that reads like synchronous logic.'
  },
  {
    id: 'event-delegation',
    name: 'Event Delegation',
    category: 'Events',
    icon: '/assets/icons/event-delegation.svg',
    projects: ['04', '06'],
    description: 'Efficient event handling via bubbling and delegation to parent elements.'
  }
];
```

---

## 11. Netlify Configuration

Add `netlify` attribute to contact form:

```html
<form name="contact" method="POST" netlify>
  <input type="text" name="name" placeholder="Your Name" required />
  <input type="email" name="email" placeholder="Your Email" required />
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send</button>
</form>
```

Netlify automatically creates form endpoint and stores submissions in dashboard.

---

## 12. Accessibility Requirements

- ✅ **Keyboard navigation:** All interactive elements fully accessible via Tab, Enter, Arrow keys, Esc
- ✅ **Color contrast:** All text meets WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
- ✅ **Semantic HTML:** Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`
- ✅ **ARIA roles:** Command palette modal has `role="dialog"`, form errors have `role="alert"`
- ✅ **Alt text:** Images have descriptive alt text
- ✅ **Skip link:** Hidden skip-to-main-content link for screen readers

---

## 13. Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (Chrome mobile, Safari mobile)

---

## 14. Performance Targets

| Metric | Target |
|--------|--------|
| **Lighthouse Performance** | ≥90 |
| **Lighthouse Accessibility** | ≥95 |
| **Lighthouse SEO** | ≥90 |
| **Page load time** | <2s (first contentful paint) |
| **Bundle size** | <50KB (JS + CSS gzipped) |

---

## 15. Development Timeline

### Phase 1: Setup & Skeleton (Week 1)
- Vite + Tailwind configuration
- HTML skeleton (all sections, placeholders)
- Responsive nav + hamburger
- Hero section

### Phase 2: Core Features (Week 2–3)
- Command palette (Ctrl+K)
- Projects grid layout + project card structure
- Project card toggle (default ↔ engineering notes)

### Phase 3: Advanced Features (Week 3–4)
- Skill graph (SVG rendering)
- Skill/project hover interactions
- Contact form + validation + Netlify setup

### Phase 4: Polish (Week 4–5)
- Copy-to-clipboard email
- Print resume stylesheet
- Animations & transitions
- Mobile testing & refinement

### Phase 5: Testing & Documentation (Week 5–6)
- Cross-browser testing
- Accessibility audit
- Compile dev-log.md → presentation-notes.md
- Final git cleanup + deploy

---

## 16. Naming Conventions

- **Files/Folders:** kebab-case (e.g., `skill-graph.js`, `contact-form.html`)
- **JS Variables:** camelCase (e.g., `projectsGrid`, `handleKeyDown`)
- **JS Classes:** PascalCase (e.g., `CommandPalette`, `SkillGraph`)
- **Constants:** SCREAMING_SNAKE_CASE (e.g., `MAX_RESULTS = 10`)
- **Booleans:** Prefix with `is` or `has` (e.g., `isOpen`, `hasError`)

---

## 17. File Structure (Final)

```
Assessment_Project_9/
├── index.html
├── src/
│   ├── script.js
│   ├── styles.css
│   └── data/
│       ├── projectsMetadata.js
│       └── skillGraphData.js
├── assets/
│   ├── images/
│   │   ├── 03-utility-calculator-bmi.svg
│   │   ├── 04-student-record-system.svg
│   │   ├── 06-theme-switcher.svg
│   │   ├── 07-quiz-app.svg
│   │   └── 08-weather-app.svg
│   └── icons/
│       ├── form-validation.svg
│       ├── localstorage.svg
│       ├── custom-parser.svg
│       ├── fetch-api.svg
│       ├── modal-dialogs.svg
│       ├── array-methods.svg
│       ├── dom-manipulation.svg
│       ├── async-await.svg
│       └── event-delegation.svg
├── docs/
│   ├── PRD.md
│   ├── dev-log.md
│   └── presentation-notes.md
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 18. Success Criteria

**Functional:**
- [ ] All 5 projects render with correct metadata and links
- [ ] Command palette works (Ctrl+K, search, arrow nav, Enter to execute)
- [ ] Project card toggle shows/hides engineering notes smoothly
- [ ] Skill graph renders and responds to hover/click
- [ ] Contact form validates, submits, and Netlify receives submissions
- [ ] Copy-to-clipboard works (or falls back gracefully)

**Quality:**
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Accessibility: lighthouse ≥95, keyboard nav complete, color contrast pass
- [ ] No console errors or warnings
- [ ] Page load time <2s

**Presentation:**
- [ ] Git history uses Conventional Commits throughout
- [ ] dev-log.md updated during development
- [ ] presentation-notes.md compiles challenges, lessons, and growth narrative

---

## 19. Deployment Checklist

- [ ] Netlify form setup (test submission)
- [ ] Custom domain configured (if applicable)
- [ ] Build command tested: `npm run build`
- [ ] Dist folder contents verified
- [ ] Live site tested on multiple browsers
- [ ] Lighthouse audit run (targets met)

---

**Document Status:** Ready for Phase 1 Development  
**Approval Date:** 2026-08-06  
**Next Step:** Commit Phase 1 (Setup & Skeleton)