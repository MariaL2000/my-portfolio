document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".main-container").forEach(initializeCarousel);
});

function initializeCarousel(carouselWrapper) {
  const wrapper = carouselWrapper.querySelector(".cards-container");
  const leftBtn = carouselWrapper.querySelector(".prev");
  const rightBtn = carouselWrapper.querySelector(".next");
  const cardWidth = wrapper.querySelector(".card")?.offsetWidth || 300;
  const scrollAmount = cardWidth + 24;

  function scrollLeft() {
    wrapper.scrollTo({
      left: wrapper.scrollLeft - scrollAmount,
      behavior: "smooth",
    });
    updateButtonStates();
  }

  function scrollRight() {
    wrapper.scrollTo({
      left: wrapper.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
    updateButtonStates();
  }

  function updateButtonStates() {
    const currentScroll = wrapper.scrollLeft;
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

    // Enable/disable left button
    leftBtn.disabled = currentScroll <= 0;
    leftBtn.style.opacity = currentScroll <= 0 ? "0.5" : "1";
    leftBtn.style.cursor = currentScroll <= 0 ? "default" : "pointer";

    // Enable/disable right button
    rightBtn.disabled = currentScroll >= maxScroll;
    rightBtn.style.opacity = currentScroll >= maxScroll ? "0.5" : "1";
    rightBtn.style.cursor = currentScroll >= maxScroll ? "default" : "pointer";
  }

  // Button click handlers
  leftBtn?.addEventListener("click", scrollLeft);
  rightBtn?.addEventListener("click", scrollRight);

  // Drag functionality
  let isDown = false;
  let startX;
  let initialScrollPos;

  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    wrapper.style.cursor = "grabbing";
    startX = e.pageX - wrapper.offsetLeft;
    initialScrollPos = wrapper.scrollLeft;
  });

  wrapper.addEventListener("mouseleave", () => {
    isDown = false;
    wrapper.style.cursor = "grab";
  });

  wrapper.addEventListener("mouseup", () => {
    isDown = false;
    wrapper.style.cursor = "grab";
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = initialScrollPos - walk;
    updateButtonStates();
  });

  // Initialize scroll state
  wrapper.addEventListener("scroll", updateButtonStates);
  updateButtonStates();

  // Set initial cursor style
  wrapper.style.cursor = "grab";
}



























function handleScroll() {
  const elements = document.querySelectorAll('.animated');
  const windowHeight = window.innerHeight;
  
  elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 50) {
          el.classList.add('show');
      } else {
          el.classList.remove('show');
      }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);