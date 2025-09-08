// Появление элементов при скролле
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Карусели (несколько секций)
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const items = carousel.querySelectorAll('.carousel-item');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
  });
});

// Лайтбокс для галереи
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevLightbox = document.querySelector('.lightbox .prev');
const nextLightbox = document.querySelector('.lightbox .next');

let currentIndex = 0;

function showLightbox(index) {
  lightbox.style.display = 'flex';
  lightboxImg.src = galleryImages[index].src;
  currentIndex = index;
}
galleryImages.forEach((img,i) => {
  img.addEventListener('click', () => showLightbox(i));
});
closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
prevLightbox.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showLightbox(currentIndex);
});
nextLightbox.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showLightbox(currentIndex);
});
