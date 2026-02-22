document.addEventListener("DOMContentLoaded", () => {
  const heroStack = document.querySelector('.hero-stack');
  const joinButtons = document.querySelector('.join-buttons');
  const sponsorshipButton = document.querySelector('.sponsorship-button');

  if (heroStack) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // optional: only trigger once
        }
      });
    }, { threshold: 0.2 }); // trigger when 20% of element is visible

    observer.observe(heroStack);
  }

  if (joinButtons) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // optional: only trigger once
        }
      });
    }, { threshold: 0.2 }); // trigger when 20% of element is visible

    observer.observe(joinButtons);
  }

  if (sponsorshipButton) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // optional: only trigger once
        }
      });
    }, { threshold: 0.2 }); // trigger when 20% of element is visible

    observer.observe(sponsorshipButton);
  }
});
