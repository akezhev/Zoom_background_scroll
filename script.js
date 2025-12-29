// Регистрация GSAP плагинов
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Конфигурация плавного скролла
const scrollSmootherConfig = {
  smooth: 1, // Сила сглаживания (1 секунда)
  effects: true, // Включение эффектов при скролле
  normalizeScroll: true, // Нормализация скорости на разных устройствах
};

// Создание плавного скролла
ScrollSmoother.create(scrollSmootherConfig);

// Конфигурация триггеров для анимаций
const heroScrollConfig = {
  scrollTrigger: {
    trigger: ".hero-container",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: 1,
  },
};

const textScrollConfig = {
  scrollTrigger: {
    trigger: ".section-stick",
    pin: true,
    start: "center center",
    end: "+=1500",
    scrub: 1,
  },
};

// Параметры анимаций
const ANIMATION_DURATION = {
  LETTERS: 1,
  FADE_OUT: 50,
  PAUSE: 10,
};

const EASING = "power1.inOut";

// Настройки анимации hero-секции
const heroAnimations = {
  coverImage: {
    scale: 2,
    z: 350,
    transformOrigin: "center center",
    ease: EASING,
  },

  coverOverlay: {
    "--overlay-opacity": 0,
    ease: EASING,
  },

  background: {
    scale: 1.1,
    filter: "blur(0px) brightness(1)",
    ease: EASING,
  },

  title: {
    scale: 1,
    xPercent: -50,
    yPercent: -50,
    opacity: 1,
    filter: "blur(0px)",
    ease: EASING,
  },
};

// Настройки анимации текста
const textAnimations = {
  letters: {
    opacity: 1,
    duration: ANIMATION_DURATION.LETTERS,
    ease: "none",
    stagger: 1,
  },

  fadeOut: {
    opacity: 0,
    scale: 1.2,
    duration: ANIMATION_DURATION.FADE_OUT,
  },
};

/**
 * Анимация hero-секции
 * Увеличение изображения, появление заголовка и эффекты при скролле
 */
function createHeroAnimation() {
  const heroTimeline = gsap.timeline(heroScrollConfig);

  // Основные анимации, запускающиеся одновременно
  heroTimeline
    .to(".hero__cover-img", heroAnimations.coverImage)
    .to(".hero__cover", heroAnimations.coverOverlay, "<")
    .to(".hero__bg", heroAnimations.background, "<")
    .to(".hero__title", heroAnimations.title, "<");

  return heroTimeline;
}

/**
 * Анимация текста с посимвольным появлением
 * Разделяет текст на буквы и анимирует их по очереди
 */
function createTextAnimation() {
  // Инициализация SplitText для работы с отдельными буквами
  const textElement = document.querySelector(".opacity-reveal");
  const splitLetters = SplitText.create(textElement);

  // Начальное состояние букв
  gsap.set(splitLetters.chars, {
    opacity: 0.2,
    y: 0,
  });

  // Создание таймлайна для анимации текста
  const textTimeline = gsap.timeline(textScrollConfig);

  textTimeline
    .to(splitLetters.chars, textAnimations.letters)
    .to({}, { duration: ANIMATION_DURATION.PAUSE }) // Пауза
    .to(".opacity-reveal", textAnimations.fadeOut);

  return textTimeline;
}

// Инициализация всех анимаций
function initAnimations() {
  const heroAnimation = createHeroAnimation();
  const textAnimation = createTextAnimation();

  return {
    heroAnimation,
    textAnimation,
  };
}

// Запуск анимаций
const animations = initAnimations();
