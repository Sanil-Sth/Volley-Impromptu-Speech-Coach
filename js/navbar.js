/* ═══════════════════════════════════════════════════════════
   VOLLEY — Navbar Component  (navbar.js)
   Injects the shared navbar SVG + active link highlight
   ═══════════════════════════════════════════════════════════ */

'use strict';

(function initNavbar() {
  const LOGO_SVG = `
    <svg class="nav-logo-svg" viewBox="0 0 120 90" fill="none" aria-hidden="true">
      <path d="M16 56 Q60 86 104 56" stroke="#E8E8E8" stroke-width="7"
            stroke-linecap="round" fill="none"/>
      <path d="M10 50 Q10 14 60 14 Q110 14 110 50" stroke="#C8F135" stroke-width="7"
            stroke-linecap="round" fill="none"/>
      <polyline points="28,44 40,44 46,27 53,60 60,18 67,53 74,53 80,38 86,44 96,44"
        stroke="#C8F135" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"
        fill="none"/>
    </svg>`;

  const nav = document.querySelector('.navbar');
  if (!nav) return;

  // Insert SVG into brand anchor if placeholder exists
  const placeholder = nav.querySelector('.nav-logo-placeholder');
  if (placeholder) {
    placeholder.outerHTML = LOGO_SVG;
  }

  // Highlight active nav link by current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === '') || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
