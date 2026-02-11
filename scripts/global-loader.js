(function() {
  const head = document.head;

  // 1. Inject Styles & Fonts
  const isSubPage = window.location.pathname.includes('/pages/');
  const basePath = isSubPage ? '../' : '';

  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Inter:wght@400;600;700&display=swap';
  head.appendChild(fontLink);

  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = `${basePath}/styles/global-styles.css`;
  head.appendChild(styleLink);

  // 2. Inject Navbar and Footer after the page loads
  window.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('navbar');
    if (navContainer) {
      fetch(`${basePath}/pages/navbar.html`)
          .then(response => response.text())
          .then(data => {
            navContainer.innerHTML = data;

            // Initialise navbar hamburger menu after injection
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
          });
    }
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      fetch(`${basePath}/pages/footer.html`)
          .then(response => response.text())
          .then(data => {
            footerContainer.innerHTML = data;
          })
    }
  });

})();