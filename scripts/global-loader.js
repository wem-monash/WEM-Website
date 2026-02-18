(function() {
  const head = document.head;

  // 1. DYNAMIC PATH LOGIC
  const isSubPage = window.location.pathname.includes('/pages/');
  const basePath = isSubPage ? '../' : '';

  // 2. INJECT FONTS
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Inter:wght@400;600;700&display=swap';
  head.appendChild(fontLink);

  // 3. INJECT STYLES
  // Maps to your /styles/ folder
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = `${basePath}styles/global-styles.css`;
  head.appendChild(styleLink);

  // 4. INJECT NAVBAR & FOOTER
  window.addEventListener('DOMContentLoaded', () => {
    // Handle Navbar (Located in /pages/ per your screenshot)
    const navContainer = document.getElementById('navbar');
    if (navContainer) {
      fetch(`${basePath}pages/navbar.html`)
        .then(res => {
          if (!res.ok) throw new Error(`Navbar 404 at ${basePath}pages/navbar.html`);
          return res.text();
        })
        .then(data => {
          navContainer.innerHTML = data;
          setupHamburger(navContainer);
        })
        .catch(err => console.error(err));
    }

    // Handle Footer (Located in /pages/ per your screenshot)
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      fetch(`${basePath}pages/footer.html`)
        .then(res => {
          if (!res.ok) throw new Error(`Footer 404 at ${basePath}pages/footer.html`);
          return res.text();
        })
        .then(data => {
          footerContainer.innerHTML = data;
        })
        .catch(err => console.error(err));
    }
  });

  function setupHamburger(navContainer) {
    const hamburger = navContainer.querySelector('.hamburger');
    const navLinks = navContainer.querySelector('.nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      navContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    }
  }
})();