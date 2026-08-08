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
      <div class="project-image-${project.id} relative w-full bg-slate-700 flex flex-1 items-center justify-center border-b border-slate-700 flex-shrink-0">
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



document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website loaded');
  renderProjects();
});