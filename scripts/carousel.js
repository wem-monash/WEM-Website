function scrollCarousel(direction) {
  const track = document.getElementById("carouselTrack");
  const scrollAmount = 400;

  track.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

function autoScrollCarousel() {
  const track = document.getElementById("carouselTrack");
  const scrollAmount = 400;

  setInterval(() => {
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  }, 2000); // Scroll every 2 seconds
}

window.onload = autoScrollCarousel;