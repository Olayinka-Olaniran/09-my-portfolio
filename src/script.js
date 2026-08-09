import { projects } from './data/projectsMetadata.js';
import { skills } from './data/skillGraphData.js';
import './styles.css';

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('menu');

function renderProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;
  projectsGrid.innerHTML = ''; // Clear existing content

  projects.forEach(project => {
    const card = document.createElement('div');
    card.id = `portfolio-${project.id}`; // matches #portfolio-XX links from the skill graph
    card.className = 'projects-card flex flex-col justify-end bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-lg';
    card.innerHTML = `
      <!-- Toggle View Buttons -->
      <div class="toggle-view flex justify-end gap-2 p-3 bg-slate-900 border-b border-slate-700">
        <button class="toggle-view-btn view-default bg-orange-400 hover:bg-orange-500 p-2 rounded transition active"
                data-project-id="${project.id}" data-view="default" title="Project Overview">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C7 5 2.73 8.11 1 12.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 8.11 17 5 12 5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
            <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
          </svg>
        </button>
        <button class="toggle-view-btn view-code bg-slate-700 text-slate-300 hover:text-orange-500 p-2 rounded transition"
                data-project-id="${project.id}" data-view="engineering-notes" title="Engineering Notes">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L3 12L9 6M15 18L21 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Project Image (hidden when engineering notes are shown) -->
      <div class="project-image-${project.id} relative w-full bg-slate-700 flex flex-1 items-center justify-center border-b border-slate-700 shrink-0">
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}" class=" object-contain w-auto h-auto">`
          : 'Project Image'}
      </div>

      <!-- Project Content -->
      <div class="p-5 bg-slate-800 flex-1 flex flex-col">
        <!-- Default View -->
        <div class="view-content default-view-${project.id} h-full flex flex-col">
          <h3 class="text-lg font-bold text-white mb-2">${project.title}</h3>
          <p class="text-slate-300 text-sm mb-4">${project.shortDescription ?? ''}</p>

          <!-- Tech Badges -->
          <div class="flex gap-2 flex-wrap mb-5">
            ${(project.technologies ?? [])
              .map(t => `<span class="bg-slate-700 border-slate-900 text-orange-400 px-3 py-1 rounded-full text-xs font-medium">${t}</span>`)
              .join('')}
            ${(project.tags ?? [])
              .map(t => `<span class="bg-slate-700 text-orange-300 px-3 py-1 rounded-full text-xs font-medium">${t}</span>`)
              .join('')}
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 mt-auto">
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener" class="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition">Demo</a>` : ''}
            ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener" class="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition">GitHub</a>` : ''}
          </div>
        </div>

        <!-- Engineering Notes View (hidden by default) -->
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

  // Single delegated listener — avoids inline onclick + window pollution
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

  // Image only makes sense alongside the default overview —
  // hide it for engineering notes to reclaim vertical space
  if (imageEl) {
    imageEl.classList.toggle('hidden', !showDefault);
  }

  // Reflect active state on the toggle buttons
  const toggleGroup = clickedBtn.closest('.toggle-view');
  if (toggleGroup) {
    toggleGroup.querySelectorAll('.toggle-view-btn').forEach(b => b.classList.remove('bg-orange-400', 'hover:bg-orange-500'));
    toggleGroup.querySelectorAll('.toggle-view-btn').forEach(b => b.classList.add('bg-slate-700', 'text-slate-300', 'hover:text-orange-500'));
  }
  clickedBtn.classList.add('bg-orange-400', 'hover:bg-orange-500');
  clickedBtn.classList.remove('bg-slate-700', 'text-slate-300', 'hover:text-orange-500');
}

function toSvgPoint(svg, clientX, clientY) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function getCenterInSvg(svg, el) {
  const r = el.getBoundingClientRect();
  return toSvgPoint(svg, r.left + r.width / 2, r.top + r.height / 2);
}

function drawEdge(svg, fromEl, toEl, id) {
  const from = getCenterInSvg(svg, fromEl);
  const to = getCenterInSvg(svg, toEl);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.id = id;
  line.classList.add('edge');
  line.setAttribute('stroke', 'black');
  line.setAttribute('stroke-width', '2');
  line.setAttribute('marker-end', 'url(#arrowhead)');
  line.setAttribute('x1', from.x);
  line.setAttribute('y1', from.y);
  line.setAttribute('x2', to.x);
  line.setAttribute('y2', to.y);
  svg.appendChild(line);
}


const svg = document.querySelector('#graph-svg'); // your middle 70%/40% column
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---- Accordion toggle (works on all breakpoints/devices) ----
document.querySelectorAll('.skill-toggle').forEach(btn => {
  const descEl = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // close every other open description first
    document.querySelectorAll('.skill-toggle[aria-expanded="true"]').forEach(otherBtn => {
      if (otherBtn === btn) return;
      otherBtn.setAttribute('aria-expanded', 'false');
      const otherDesc = document.getElementById(otherBtn.getAttribute('aria-controls'));
      if (otherDesc) otherDesc.classList.add('hidden');
    });

    // then toggle this one based on its own prior state
    btn.setAttribute('aria-expanded', String(!isOpen));
    if (descEl) descEl.classList.toggle('hidden', isOpen);
  });
});

// ---- Graph drawing / fading ----
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


function clearEdges(svg) {
  svg.querySelectorAll('.edge').forEach(e => e.remove());
}

// ---- Skill nodes: hover (desktop) or tap (mobile) ----
document.querySelectorAll('.skill-node').forEach(skillEl => {
  const projectIds = skills[skillEl.dataset.index].projects;

  if (supportsHover) {
    skillEl.addEventListener('mouseenter', () => showSkillGraph(skillEl, projectIds));
    skillEl.addEventListener('mouseleave', resetGraph);
  } else {
    skillEl.addEventListener('click', () => {
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

// ---- Project nodes: hover (desktop) or tap (mobile) ----
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
      // native <a href="#portfolio-XX"> still navigates after this runs
    });
  }
});

// ---- Tap outside clears state (mobile only) ----
if (!supportsHover) {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.skill-node') && !e.target.closest('.project-node')) {
      document.querySelectorAll('.graph-active').forEach(el => el.classList.remove('graph-active'));
      resetGraph();
    }
  });
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  // Close menu when a nav link is clicked
  const mobileNavLinks = mobileMenu.querySelectorAll('a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

const copyEmailBtn = document.getElementById('copy-email-btn');
const emailAddress = 'oolaniran853@gmail.com';

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      showCopyFeedback(copyEmailBtn);
    } catch {
      // fallback for browsers without Clipboard API or non-secure context
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
  });
}

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

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website loaded');
  renderProjects();
});