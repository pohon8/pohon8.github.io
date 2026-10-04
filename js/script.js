const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const yearNode = document.querySelector('[data-year]');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const path = window.location.pathname.split('/').filter(Boolean).pop();
if (path) {
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const current = href.split('/').filter(Boolean).pop();
    if (current === path) {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Mengirim...';

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      form.reset();
      const message = document.createElement('p');
      message.textContent = 'Pesan Anda telah berhasil dikirim. Tim kami akan menghubungi segera.';
      message.style.marginTop = '0.75rem';
      message.style.color = '#1d4d39';
      message.style.fontWeight = '600';
      form.appendChild(message);
    }, 1200);

    event.preventDefault();
  });
});
