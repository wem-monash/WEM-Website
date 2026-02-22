function scrollCarousel(direction) {
  const track = document.getElementById("carouselTrack");
  const scrollAmount = 400;
  const maxScrollLeft = track.scrollWidth - track.clientWidth;

  if (direction > 0 && track.scrollLeft + scrollAmount >= maxScrollLeft) {

    // if scrolling right and reach end
    track.scrollTo({ left: 0, behavior: "smooth" });
  } else if (direction < 0 && track.scrollLeft - scrollAmount <= 0) {
    // if scrolling left and reach beginning
    track.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
  } else {
    
    
    // default scroll behavior
    track.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }
}

function autoScrollCarousel() {
  const track = document.getElementById("carouselTrack");
  const scrollAmount = 400;
  const maxScrollLeft = track.scrollWidth - track.clientWidth;

  setInterval(() => {
    if (track.scrollLeft + scrollAmount >= maxScrollLeft) {
     
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
     
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, 2000); // Scroll every 2 seconds , might adjust this??
}

window.onload = autoScrollCarousel;