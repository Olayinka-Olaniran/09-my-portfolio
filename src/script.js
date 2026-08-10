import { projects } from './data/projectsMetadata.js';
import { skills } from './data/skillGraphData.js';
import './styles.css';

// ============================================================
// DOM QUERIES
// ============================================================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('menu');
const projectsGrid = document.getElementById('projects-grid');

const svg = document.querySelector('#graph-svg');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const commandPalette = document.getElementById('command-palette');
const paletteSearch = document.getElementById('palette-search');
const paletteResults = document.getElementById('palette-results');
const paletteEmpty = document.getElementById('palette-empty');
const paletteTriggers = document.querySelectorAll('.palette-trigger');

const copyEmailBtn = document.getElementById('copy-email-btn');
const emailAddress = 'oolaniran853@gmail.com';

const navSections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('#menu a[href^="#"], nav a[href^="#"]');

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// ============================================================
// STATE
// ============================================================
let paletteFiltered = [];
let paletteActiveIndex = 0;
let paletteTriggerEl = null;

// ============================================================
// PROJECT RENDERING (Portfolio section)
// ============================================================
function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('div');
    card.id = `portfolio-${project.id}`;
    card.className = 'projects-card flex flex-col justify-end bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-lg';
    card.innerHTML = `
      <div class="toggle-view flex justify-end gap-2 p-3 bg-slate-900 border-b border-slate-700">
        <button class="toggle-view-btn view-default bg-orange-400 hover:bg-orange-500 p-2 rounded transition active"
                data-project-id="${project.id}" data-view="default" title="Project Overview" aria-pressed="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 5C7 5 2.73 8.11 1 12.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 8.11 17 5 12 5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
            <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
          </svg>
          <span class="sr-only">Project Overview</span>
        </button>
        <button class="toggle-view-btn view-code bg-slate-700 text-slate-300 hover:text-orange-500 p-2 rounded transition"
                data-project-id="${project.id}" data-view="engineering-notes" title="Engineering Notes" aria-pressed="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 18L3 12L9 6M15 18L21 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="sr-only">Engineering Notes</span>
        </button>
      </div>

      <div class="project-image-${project.id} relative w-full bg-slate-700 flex flex-1 items-center justify-center border-b border-slate-700 shrink-0">
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}" class=" object-contain w-auto h-auto">`
          : 'Project Image'}
      </div>

      <div class="p-5 bg-slate-800 flex-1 flex flex-col">
        <div class="view-content default-view-${project.id} h-full flex flex-col">
          <h3 class="text-lg font-bold text-white mb-2">${project.title}</h3>
          <p class="text-slate-300 text-sm mb-4">${project.shortDescription ?? ''}</p>
          <div class="flex gap-2 flex-wrap mb-5">
            ${(project.technologies ?? [])
              .map(t => `<span class="bg-slate-700 border-slate-900 text-orange-400 px-3 py-1 rounded-full text-xs font-medium">${t}</span>`)
              .join('')}
            ${(project.tags ?? [])
              .map(t => `<span class="bg-slate-700 text-orange-300 px-3 py-1 rounded-full text-xs font-medium">${t}</span>`)
              .join('')}
          </div>
          <div class="flex gap-2 mt-auto">
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener" class="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition">Demo</a>` : ''}
            ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener" class="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition">GitHub</a>` : ''}
          </div>
        </div>

        <div class="view-content hidden engineering-view-${project.id} h-full flex flex-col">
          <div class="space-y-3">
            <div>
              <h4 class="text-orange-400 font-semibold text-sm mb-1">Problem</h4>
              <p class="text-slate-300 text-sm">${project.engineeringNotes?.problem ?? ''}</p>
            </div>
            <div>
              <h4 class="text-orange-400 font-semibold text-sm mb-1">Key Decision</h4>
              <p class="text-slate-300 text-sm">${project.engineeringNotes?.keyDecision ?? ''}</p>
            </div>
            <div>
              <h4 class="text-orange-400 font-semibold text-sm mb-1">Challenge</h4>
              <p class="text-slate-300 text-sm">${project.engineeringNotes?.challenge ?? ''}</p>
            </div>
            <div>
              <h4 class="text-orange-400 font-semibold text-sm mb-1">Hindsight</h4>
              <p class="text-slate-300 text-sm">${project.engineeringNotes?.hindsight ?? ''}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });

  projectsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle-view-btn');
    if (!btn) return;
    toggleView(btn.dataset.projectId, btn.dataset.view, btn);
  });
}

function toggleView(projectId, view, clickedBtn) {
  const defaultView = document.querySelector(`.default-view-${projectId}`);
  const engineeringView = document.querySelector(`.engineering-view-${projectId}`);
  const imageEl = document.querySelector(`.project-image-${projectId}`);
  if (!defaultView || !engineeringView) return;

  const showDefault = view === 'default';
  defaultView.classList.toggle('hidden', !showDefault);
  engineeringView.classList.toggle('hidden', showDefault);
  if (imageEl) imageEl.classList.toggle('hidden', !showDefault);

  const toggleGroup = clickedBtn.closest('.toggle-view');
  if (toggleGroup) {
    toggleGroup.querySelectorAll('.toggle-view-btn').forEach(b => {
      const isActive = b === clickedBtn;
      b.classList.toggle('bg-orange-400', isActive);
      b.classList.toggle('hover:bg-orange-500', isActive);
      b.classList.toggle('bg-slate-700', !isActive);
      b.classList.toggle('text-slate-300', !isActive);
      b.classList.toggle('hover:text-orange-500', !isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });
  }
}

// ============================================================
// SKILL GRAPH — coordinate math
// ============================================================
function toSvgPoint(svgEl, clientX, clientY) {
  const pt = svgEl.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  return pt.matrixTransform(svgEl.getScreenCTM().inverse());
}

function getCenterInSvg(svgEl, el) {
  const r = el.getBoundingClientRect();
  return toSvgPoint(svgEl, r.left + r.width / 2, r.top + r.height / 2);
}

// ============================================================
// SKILL GRAPH — visual defs (glow filter)
// Injected once into #graph-svg so every edge can reference it.
// ============================================================
function initGraphDefs(svgEl) {
  if (svgEl.querySelector('#graph-defs')) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.id = 'graph-defs';
  defs.innerHTML = `
    <filter id="edge-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  `;
  svgEl.prepend(defs);
}

// ============================================================
// SKILL GRAPH — edge drawing
// ============================================================
function drawEdge(svgEl, fromEl, toEl, id) {
  const from = getCenterInSvg(svgEl, fromEl);
  const to = getCenterInSvg(svgEl, toEl);

  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.classList.add('edge');
  group.id = id;

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('stroke', '#f97316');       // orange-500, matches site accent
  line.setAttribute('stroke-width', '2');
  line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('filter', 'url(#edge-glow)'); // soft glow so lines read as "active energy," not flat rulers
  line.setAttribute('x1', from.x);
  line.setAttribute('y1', from.y);
  line.setAttribute('x2', to.x);
  line.setAttribute('y2', to.y);

  // ---- Grow-in animation instead of snapping into view ----
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  line.setAttribute('stroke-dasharray', length);
  line.setAttribute('stroke-dashoffset', length);
  line.style.transition = 'stroke-dashoffset 280ms ease-out';
  // Double rAF — a single frame can land in the same paint as the initial
  // offset, so the transition never visibly triggers. Nesting two frames
  // guarantees the starting state has actually painted first.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      line.style.strokeDashoffset = '0';
    });
  });

  group.appendChild(line);

  // Small pulsing dots at each endpoint — highlights exactly where the
  // connection lands on both nodes.
  [from, to].forEach(point => {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', point.x);
    dot.setAttribute('cy', point.y);
    dot.setAttribute('r', '3.5');
    dot.setAttribute('fill', '#fb923c'); // orange-400, slightly lighter than the line

    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    pulse.setAttribute('attributeName', 'r');
    pulse.setAttribute('values', '3;5;3');
    pulse.setAttribute('dur', '1.4s');
    pulse.setAttribute('repeatCount', 'indefinite');
    dot.appendChild(pulse);

    group.appendChild(dot);
  });

  svgEl.appendChild(group);
}

function clearEdges(svgEl) {
  svgEl.querySelectorAll('.edge').forEach(e => e.remove());
}

// ============================================================
// SKILL GRAPH — fade + highlight state
// ============================================================
function fadeNodes({ activeSkillEls = [], activeProjectIds = [] } = {}) {
  document.querySelectorAll('.skill-node').forEach(el => {
    el.style.transition = 'opacity 150ms ease';
    el.style.opacity = activeSkillEls.includes(el) ? '1' : '0.3';
  });
  document.querySelectorAll('.project-node').forEach(el => {
    el.style.transition = 'opacity 150ms ease';
    el.style.opacity = activeProjectIds.includes(el.id) ? '1' : '0.3';
  });
}

function resetGraph() {
  clearEdges(svg);
  document.querySelectorAll('.skill-node, .project-node').forEach(el => {
    el.style.opacity = '1';
  });
}

function showSkillGraph(skillEl, projectIds) {
  clearEdges(svg);
  fadeNodes({ activeSkillEls: [skillEl], activeProjectIds: projectIds });
  projectIds.forEach(pid => {
    const projectEl = document.getElementById(pid);
    if (projectEl) drawEdge(svg, skillEl, projectEl, `edge-${pid}`);
  });
}

function getSkillIndicesForProject(projectId) {
  return skills
    .map((skill, idx) => ({ skill, idx }))
    .filter(({ skill }) => skill.projects.includes(projectId))
    .map(({ idx }) => idx);
}

function showProjectGraph(projectEl, skillIndices) {
  clearEdges(svg);
  const skillEls = skillIndices
    .map(i => document.querySelector(`.skill-node[data-index="${i}"]`))
    .filter(Boolean);
  fadeNodes({ activeSkillEls: skillEls, activeProjectIds: [projectEl.id] });
  skillEls.forEach((skillEl, n) => drawEdge(svg, skillEl, projectEl, `edge-skill-${n}`));
}

// ============================================================
// COMMAND PALETTE
// ============================================================
function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}

function buildCommands() {
  const staticCommands = [
    { label: 'Go to Home', key: 'H', action: () => scrollToSection('#home') },
    { label: 'Go to Skills', key: 'S', action: () => scrollToSection('#skills') },
    { label: 'Go to Portfolio', key: 'P', action: () => scrollToSection('#portfolio') },
    { label: 'Go to Contact', key: 'C', action: () => scrollToSection('#contact') },
    { label: 'Open GitHub profile', key: 'G', action: () => window.open('https://github.com/Olayinka-Olaniran', '_blank') },
    { label: 'Copy email address', key: 'E', action: () => copyEmailBtn?.click() },
  ];

  const projectCommands = projects.map(project => ({
    label: `Jump to project: ${project.title}`,
    key: '',
    action: () => scrollToSection(`#portfolio-${project.id}`)
  }));

  return [...staticCommands, ...projectCommands];
}

const allCommands = buildCommands();

function openPalette(triggerEl) {
  paletteTriggerEl = triggerEl ?? null;
  commandPalette.classList.remove('hidden');
  commandPalette.classList.add('flex');
  paletteSearch.value = '';
  renderPaletteResults(allCommands);
  paletteSearch.focus();
  document.body.style.overflow = 'hidden';
  paletteTriggers.forEach(t => t.setAttribute('aria-expanded', 'true'));
}

function closePalette() {
  commandPalette.classList.add('hidden');
  commandPalette.classList.remove('flex');
  document.body.style.overflow = '';
  paletteTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
  // Return focus to whatever opened the palette, so keyboard users
  // aren't dropped back at the top of the page.
  if (paletteTriggerEl) {
    paletteTriggerEl.focus();
    paletteTriggerEl = null;
  }
}

function renderPaletteResults(results) {
  paletteFiltered = results;
  paletteActiveIndex = 0;
  paletteEmpty.classList.toggle('hidden', results.length > 0);

  paletteResults.innerHTML = results
    .map((cmd, idx) => `
      <li class="palette-result px-4 py-2.5 flex items-center justify-between cursor-pointer text-sm text-slate-200 ${idx === 0 ? 'bg-orange-500/10 text-orange-400' : ''}"
          data-index="${idx}" role="option" aria-selected="${idx === 0}">
        <span>${cmd.label}</span>
        ${cmd.key ? `<kbd class="text-[10px] text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">${cmd.key}</kbd>` : ''}
      </li>
    `)
    .join('');

  paletteResults.querySelectorAll('.palette-result').forEach(el => {
    el.addEventListener('click', () => executeCommand(parseInt(el.dataset.index, 10)));
    el.addEventListener('mousemove', () => setActiveIndex(parseInt(el.dataset.index, 10)));
  });
}

function setActiveIndex(idx) {
  paletteActiveIndex = idx;
  paletteResults.querySelectorAll('.palette-result').forEach(el => {
    const isActive = parseInt(el.dataset.index, 10) === idx;
    el.classList.toggle('bg-orange-500/10', isActive);
    el.classList.toggle('text-orange-400', isActive);
    el.setAttribute('aria-selected', String(isActive));
    if (isActive) el.scrollIntoView({ block: 'nearest' });
  });
}

function executeCommand(idx) {
  const cmd = paletteFiltered[idx];
  if (!cmd) return;
  closePalette();
  cmd.action();
}

// ============================================================
// COPY EMAIL
// ============================================================
function showCopyFeedback(btn) {
  const label = document.createElement('span');
  label.textContent = 'Copied!';
  label.className = 'text-xs text-green-400 ml-1';
  btn.insertAdjacentElement('afterend', label);
  btn.setAttribute('aria-label', 'Email copied');
  setTimeout(() => {
    label.remove();
    btn.setAttribute('aria-label', 'Copy email address');
  }, 2000);
}

async function copyEmailToClipboard() {
  try {
    await navigator.clipboard.writeText(emailAddress);
    showCopyFeedback(copyEmailBtn);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = emailAddress;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(copyEmailBtn);
    } catch {
      alert(`Copy failed — email is ${emailAddress}`);
    }
    document.body.removeChild(textarea);
  }
}

// ============================================================
// SCROLL-SPY NAV HIGHLIGHTING
// ============================================================
function setActiveNavLink(sectionId) {
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('text-orange-500', isActive);
  });
}

function initScrollSpy() {
  if (!navSections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNavLink(entry.target.id);
        }
      });
    },
    {
      // Section counts as "current" once it crosses roughly the upper third
      // of the viewport — -100px on top roughly clears the sticky header so
      // a section isn't flagged active while still hidden behind it.
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    }
  );

  navSections.forEach(section => observer.observe(section));
}

// ============================================================
// CONTACT FORM — client-side validation + async submit feedback
// ============================================================
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clearFormStatus() {
  if (!formStatus) return;
  formStatus.textContent = '';
  formStatus.classList.remove('text-red-600', 'text-green-600', 'text-slate-500');
}

function setFormStatus(message, tone = 'info') {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove('text-red-600', 'text-green-600', 'text-slate-500');
  const toneClass = tone === 'success' ? 'text-green-600' : tone === 'error' ? 'text-red-600' : 'text-slate-500';
  formStatus.classList.add(toneClass);
}

function validateContactForm() {
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    setFormStatus('Please fill in every field before sending.', 'error');
    return false;
  }
  if (!EMAIL_PATTERN.test(email)) {
    setFormStatus('Please enter a valid email address.', 'error');
    return false;
  }
  return true;
}

async function handleContactSubmit(e) {
  e.preventDefault();
  if (!validateContactForm()) return;

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  setFormStatus('Sending your message…', 'info');

  try {
    const formData = new FormData(contactForm);
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });

    if (!response.ok) throw new Error(`Submission failed with status ${response.status}`);

    setFormStatus("Thanks — your message is on its way. I'll reply within a day.", 'success');
    contactForm.reset();
  } catch (err) {
    setFormStatus('Something went wrong sending that — please email me directly instead.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
}

// ============================================================
// INIT (runs once, before listeners attach)
// ============================================================
if (svg) initGraphDefs(svg);
initScrollSpy();

// ============================================================
// EVENT LISTENERS
// ============================================================

// Mobile hamburger menu
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const willOpen = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    menuToggle.setAttribute('aria-expanded', String(willOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Skill description accordion (single-open)
document.querySelectorAll('.skill-toggle').forEach(btn => {
  const descEl = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.skill-toggle[aria-expanded="true"]').forEach(otherBtn => {
      if (otherBtn === btn) return;
      otherBtn.setAttribute('aria-expanded', 'false');
      const otherDesc = document.getElementById(otherBtn.getAttribute('aria-controls'));
      if (otherDesc) otherDesc.classList.add('hidden');
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    if (descEl) descEl.classList.toggle('hidden', isOpen);
  });
});

// Skill nodes: hover (desktop) or tap (mobile)
document.querySelectorAll('.skill-node').forEach(skillEl => {
  const projectIds = skills[skillEl.dataset.index].projects;
  const displayDescBtn = skillEl.querySelector('.skill-toggle');
  if (supportsHover) {
    skillEl.addEventListener('mouseenter', () => showSkillGraph(skillEl, projectIds));
    skillEl.addEventListener('mouseleave', resetGraph);
  } else {
    displayDescBtn.addEventListener('click', () => {
      const wasActive = skillEl.classList.contains('graph-active');
      document.querySelectorAll('.graph-active').forEach(el => el.classList.remove('graph-active'));
      resetGraph();
      if (!wasActive) {
        skillEl.classList.add('graph-active');
        showSkillGraph(skillEl, projectIds);
      }
    });
  }
});

// Project nodes: hover (desktop) or tap (mobile)
document.querySelectorAll('.project-node').forEach(projectEl => {
  const skillIndices = getSkillIndicesForProject(projectEl.id);

  if (supportsHover) {
    projectEl.addEventListener('mouseenter', () => showProjectGraph(projectEl, skillIndices));
    projectEl.addEventListener('mouseleave', resetGraph);
  } else {
    projectEl.addEventListener('click', () => {
      document.querySelectorAll('.graph-active').forEach(el => el.classList.remove('graph-active'));
      projectEl.classList.add('graph-active');
      showProjectGraph(projectEl, skillIndices);
    });
  }
});

// Tap outside clears graph state (mobile only)
if (!supportsHover) {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.skill-node') && !e.target.closest('.project-node')) {
      document.querySelectorAll('.graph-active').forEach(el => el.classList.remove('graph-active'));
      resetGraph();
    }
  });
}

// Command palette
paletteSearch?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = query ? allCommands.filter(c => c.label.toLowerCase().includes(query)) : allCommands;
  renderPaletteResults(filtered);
});

paletteSearch?.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setActiveIndex(Math.min(paletteActiveIndex + 1, paletteFiltered.length - 1));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setActiveIndex(Math.max(paletteActiveIndex - 1, 0));
  } else if (e.key === 'Enter') {
    e.preventDefault();
    executeCommand(paletteActiveIndex);
  } else if (e.key === 'Escape') {
    closePalette();
  }
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    commandPalette.classList.contains('hidden') ? openPalette(document.activeElement) : closePalette();
  }
});

paletteTriggers.forEach(btn => btn.addEventListener('click', () => openPalette(btn)));

commandPalette?.addEventListener('click', (e) => {
  if (e.target === commandPalette) closePalette();
});

// Copy email
copyEmailBtn?.addEventListener('click', copyEmailToClipboard);

// Contact form
contactForm?.addEventListener('submit', handleContactSubmit);
document.addEventListener('click', (e) => { if (!e.target.closest('#form-status')) clearFormStatus(); });

// Init
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website loaded');
  renderProjects();
});