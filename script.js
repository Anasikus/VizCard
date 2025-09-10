// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
navLinks.forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show'));
});

// Анимации появления при скролле
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
faders.forEach(fader => appearOnScroll.observe(fader));

// --- Карусель с автопрокруткой ---
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const items = carousel.querySelectorAll('.carousel-item');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  let index = 0;
  let autoSlide;

  function updateCarousel() {
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      index = (index + 1) % items.length;
      updateCarousel();
    }, 5000); // увеличено время до 5 секунд
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length;
    updateCarousel();
    restartAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
    restartAutoSlide();
  });

  // Остановка при наведении курсора
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
});

// --- Лайтбокс ---
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDesc = document.querySelector('.lightbox-desc');
const closeBtn = document.querySelector('.close');
const prevLightbox = document.querySelector('.lightbox .prev');
const nextLightbox = document.querySelector('.lightbox .next');
let currentIndex = 0;

// Заголовки и описания для фотографий
const galleryData = [
  {title: 'Cпортивное мероприятие "День здоровья"', desc: ""},
  {title: '"Фестиваль возможностей" для обучающихся с множественными нарушениями здоровья', desc: ""},
  {title: '10 национальный чемпионат "Абилимпикс"', desc: ""},
  {title: 'Региональный добровольческий центр "Абилимпикс" Ярославской области', desc: ""},
  {title: 'Участники 10 регионального чемпионата "Абилимпикс" Ярославской области', desc: ""},
  {title: 'Выпускной вечер групп профессионального обучения для людей с ОВЗ и инвалидностью', desc: ""},
  {title: 'Выпускной вечер групп профессионального обучения для людей с ОВЗ и инвалидностью', desc: ""},
  {title: 'Межрегиональный молодёжный форум для добровольцев "Добро без границ"', desc: ""},
];

function showLightbox(index) {
  lightbox.style.display = 'flex';
  lightboxImg.src = galleryImages[index].src;
  lightboxTitle.textContent = galleryData[index].title;
  lightboxDesc.textContent = galleryData[index].desc;
  currentIndex = index;
}

galleryImages.forEach((img,i) => img.addEventListener('click', () => showLightbox(i)));
closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
prevLightbox.addEventListener('click', () => showLightbox((currentIndex - 1 + galleryImages.length) % galleryImages.length));
nextLightbox.addEventListener('click', () => showLightbox((currentIndex + 1) % galleryImages.length));
