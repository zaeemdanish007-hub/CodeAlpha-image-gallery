// Gallery Images
const galleryImages = document.querySelectorAll(".gallery-item img");

// Lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");

// Lightbox Buttons
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Image Counter
const imageCounter = document.querySelector(".image-counter");

// Current Image
let currentIndex = 0;
// Currently Visible Images
let visibleImages = Array.from(galleryImages);
// Open Lightbox
galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    // Find the clicked image in visible images
    currentIndex = visibleImages.indexOf(image);

    lightbox.classList.add("active");

    showImage(currentIndex);
  });
});
// Close Lightbox
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});
// Display Image
function showImage(index) {
  lightboxImage.src = visibleImages[index].src;
  lightboxImage.alt = visibleImages[index].alt;

  imageCounter.textContent = `${index + 1} / ${visibleImages.length}`;
}
// Next Image
nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= visibleImages.length) {
    currentIndex = 0;
  }

  showImage(currentIndex);
});
// Previous Image
prevBtn.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = visibleImages.length - 1;
  }

  showImage(currentIndex);
});
// Close Lightbox When Clicking Outside the Image
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("active");
  }
});
// Keyboard Controls
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    lightbox.classList.remove("active");
  }

  if (event.key === "ArrowRight") {
    currentIndex++;

    if (currentIndex >= galleryImages.length) {
      currentIndex = 0;
    }

    showImage(currentIndex);
  }

  if (event.key === "ArrowLeft") {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = galleryImages.length - 1;
    }

    showImage(currentIndex);
  }
});
// Category Filters
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button
    button.classList.add("active");

    // Get selected category
    const filter = button.dataset.filter;

    // Show or hide gallery items
    visibleImages = [];

    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.style.display = "block";

        // Add visible image to the array
        visibleImages.push(item.querySelector("img"));
      } else {
        item.style.display = "none";
      }
    });
  });
});
