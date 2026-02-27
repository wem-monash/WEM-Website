document.addEventListener("DOMContentLoaded", () => {

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    reveals.forEach(el => observer.observe(el));
});

function animateCounter(el, target) {
    let count = 0;
    const increment = target / 80;

    const update = () => {
        count += increment;
        if (count < target) {
            el.textContent = Math.floor(count);
            requestAnimationFrame(update);
        } else {
            el.textContent = target + "+";
        }
    };

    update();
}

document.querySelectorAll(".stat h1:first-child").forEach(el => {
    const target = parseInt(el.textContent);
    animateCounter(el, target);
});

