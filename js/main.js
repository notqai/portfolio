// ---- Theme (set early via inline script in <head>; this wires the toggle) ----
(function () {
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // ---- Active nav link ----
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ---- Contact form (graceful demo handler if no real endpoint) ----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const action = form.getAttribute('action') || '';
      if (action.includes('YOUR_FORM_ID') || action === '') {
        e.preventDefault();
        const status = document.getElementById('form-status');
        if (status) {
          status.textContent = 'Form not yet connected — email me directly at qaisersiew123@gmail.com.';
          status.style.color = 'var(--accent)';
        }
      }
    });
  }
});
