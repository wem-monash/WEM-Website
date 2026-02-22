(function() {
  const head = document.head;

  // 1. DYNAMIC PATH & REPO LOGIC
  const isSubPage = window.location.pathname.includes('/pages/');
  const basePath = isSubPage ? '../' : '';

  // FIXED REPO DETECTION:
  // Works on GitHub Pages AND your local WebStorm/Live Server
  const isGitHubPages = window.location.hostname.includes('github.io');
  const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // On local servers, the repo name is often part of the URL path (e.g., /WEM-Website/index.html)
const repoName = window.location.pathname.startsWith('/WEM-Website') ? '/WEM-Website' : '';

  // 2. INJECT FONTS & CSS
  const links = [
    'https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Inter:wght@400;600;700&display=swap',
    `${basePath}styles/global-styles.css`,
    `${basePath}styles/navbar.css`,
    `${basePath}styles/footer.css`
  ];

  links.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    head.appendChild(link);
  });

  // 3. INJECT NAVBAR & FOOTER
  window.addEventListener('DOMContentLoaded', () => {
    // Inject Navbar
    const navContainer = document.getElementById('navbar');
    if (navContainer) {
      fetch(`${basePath}pages/navbar.html`)
        .then(res => res.text())
        .then(data => {
          // One-step replacement for all links and images
          let processedData = data.replace(/href="\//g, `href="${repoName}/`)
            .replace(/src="\//g, `src="${repoName}/`);
          navContainer.innerHTML = processedData;
          setupHamburger(navContainer);
        });
    }

    // Inject Footer
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      fetch(`${basePath}pages/footer.html`)
        .then(res => res.text())
        .then(data => {
          let processedData = data.replace(/href="\//g, `href="${repoName}/`)
            .replace(/src="\//g, `src="${repoName}/`);
          footerContainer.innerHTML = processedData;
        });
    }
  });

  function setupHamburger(navContainer) {
    const hamburger = navContainer.querySelector('.hamburger');
    const navLinks = navContainer.querySelector('.nav-links');
    if (hamburger && navLinks) {
      hamburger.onclick = () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      };
    }
  }
})();