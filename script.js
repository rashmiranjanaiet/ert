// script.js — Interactivity: theme toggle, mobile nav, form validation, smooth scroll
(function () {
  // DOM references
  const html = document.documentElement;
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const nav = document.getElementById('nav');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const resetBtn = document.getElementById('resetBtn');

  // Initialize year
  yearEl.textContent = new Date().getFullYear();

  // Persisted theme (localStorage)
  const storedTheme = localStorage.getItem('site-theme');
  if (storedTheme) {
    document.body.className = storedTheme;
    themeToggle.setAttribute('aria-pressed', storedTheme === 'theme-dark');
    themeToggle.textContent = storedTheme === 'theme-dark' ? '☀️' : '🌙';
  }

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('theme-dark');
    if (!isDark) document.body.classList.add('theme-light');
    else document.body.classList.remove('theme-light');
    themeToggle.setAttribute('aria-pressed', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('site-theme', isDark ? 'theme-dark' : 'theme-light');
  });

  // Mobile nav toggle
  mobileNavToggle.addEventListener('click', () => {
    const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    mobileNavToggle.setAttribute('aria-expanded', !expanded);
    // show/hide nav (simple)
    if (nav.style.display === 'block') {
      nav.style.display = '';
      mobileNavToggle.textContent = '☰';
    } else {
      nav.style.display = 'block';
      mobileNavToggle.textContent = '✕';
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // if mobile nav open, close it
        if (mobileNavToggle.getAttribute('aria-expanded') === 'true') {
          mobileNavToggle.click();
        }
      }
    });
  });

  // Basic form validation & mailto fallback
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    feedback.textContent = '';
    // simple constraint checking
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) {
      feedback.textContent = 'Please enter your name (2+ characters).';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }
    if (message.length < 10) {
      feedback.textContent = 'Message is too short — tell us more about your project.';
      return;
    }

    // If you had a backend, here we'd POST to API.
    // For this template, use mailto fallback:
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:hello@aurora.example?subject=${subject}&body=${body}`;

    // open mail client in new window
    window.location.href = mailto;
    feedback.textContent = 'Opening your email client...';
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    feedback.textContent = '';
    form.name.focus();
  });

  // Accessibility: close mobile nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileNavToggle.getAttribute('aria-expanded') === 'true') mobileNavToggle.click();
    }
  });

  // Ensure theme-light class exists by default
  if (!document.body.classList.contains('theme-dark') && !document.body.classList.contains('theme-light')) {
    document.body.classList.add('theme-light');
  }
})();
