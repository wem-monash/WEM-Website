(function() {
  const head = document.head;

  // 1. DYNAMIC PATH & REPO LOGIC
  const isSubPage = window.location.pathname.includes('/pages/');
  const basePath = isSubPage ? '../' : '';

  // Detect if we are on GitHub Pages sub-path (e.g., /WEM-Website/)
  const isGitHubPages = window.location.hostname.includes('github.io');
  const repoName = isGitHubPages ? '/WEM-Website' : '';

  // 2. INJECT FONTS
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Inter:wght@400;600;700&display=swap';
  head.appendChild(fontLink);

  // 3. INJECT STYLES
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = `${basePath}styles/global-styles.css`;
  head.appendChild(styleLink);

  const styleNavbar = document.createElement('link');
  styleNavbar.rel = 'stylesheet';
  styleNavbar.href = `${basePath}styles/navbar.css`;
  head.appendChild(styleNavbar);

  const styleFooter = document.createElement('link');
  styleFooter.rel = 'stylesheet';
  styleFooter.href = `${basePath}styles/footer.css`;
  head.appendChild(styleFooter);

  // 4. INJECT NAVBAR & FOOTER
  window.addEventListener('DOMContentLoaded', () => {
    // Inject Navbar
    const navContainer = document.getElementById('navbar');
    if (navContainer) {
      fetch(`${basePath}pages/navbar.html`)
        .then(res => res.text())
        .then(data => {
          // Automatically prefix links with repoName for GitHub Pages
          navContainer.innerHTML = data.replace(/href="\//g, `href="${repoName}/`);
          // Fix images too
          navContainer.innerHTML = navContainer.innerHTML.replace(/src="\//g, `src="${repoName}/`);
          setupHamburger(navContainer);
        });
    }

    // Inject Footer
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      fetch(`${basePath}pages/footer.html`)
        .then(res => res.text())
        .then(data => {
          footerContainer.innerHTML = data.replace(/href="\//g, `href="${repoName}/`);
          footerContainer.innerHTML = footerContainer.innerHTML.replace(/src="\//g, `src="${repoName}/`);
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