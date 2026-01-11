// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
  console.log('Bose Lab website loaded.');

  // Add active class to current nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Theme Toggle Logic
  const toggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check for saved user preference, if any, on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});
