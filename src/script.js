import { projects } from './data/projectsMetadata.js';
import { skills } from './data/skillGraphData.js';
import './styles.css';

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Close menu when a nav link is clicked
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.toggle('flex');
        });
    });
}

/*<!-- Projects Grid -->
                <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Projects will be rendered here by JavaScript -->
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div class="bg-slate-200 h-48 flex items-center justify-center text-slate-500">
                            Project placeholder
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-slate-900 mb-2">Project Title</h3>
                            <p class="text-slate-600 mb-4">Short project description goes here.</p>
                            <div class="flex gap-2 flex-wrap mb-4">
                                <span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Tech</span>
                            </div>
                            <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition">
                                View Demo
                            </button>
                        </div>
                    </div>
                </div>*/