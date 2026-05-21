/**
 * KAMIL STUDIO — script.js
 * Features:
 *  1. Navbar scroll effect
 *  2. Hamburger menu (mobile)
 *  3. Active nav link on scroll
 *  4. Scroll-triggered fade animations
 *  5. Audio autoplay otomatis saat interaksi pertama
 *  6. Footer year auto-update
 */

/* ============================================================
   1. FOOTER — Auto Year
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();


/* ============================================================
   2. NAVBAR — Scroll Effect
   ============================================================ */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });


/* ============================================================
   3. HAMBURGER MENU (Mobile)
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ============================================================
   4. ACTIVE NAV LINK — Berdasarkan posisi scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const allLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  allLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });


/* ============================================================
   5. SCROLL ANIMATION — Intersection Observer (Fade In)
   ============================================================ */
const animatedEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedEls.forEach(el => scrollObserver.observe(el));


/* ============================================================
   6. AUDIO — Autoplay otomatis saat interaksi pertama user
   ============================================================
   Browser modern memblokir autoplay dengan suara sebelum ada
   interaksi. Solusi: play saat user pertama kali scroll, klik,
   atau sentuh layar. Tidak ada tombol — berjalan di background.
   ============================================================ */
const audio = document.getElementById('bg-audio');

if (audio) {
  audio.volume = 0.35;

  // Coba autoplay langsung (berhasil di beberapa browser)
  audio.play().catch(() => {
    // Gagal — tunggu interaksi pertama user
  });

  // Autoplay saat interaksi pertama (klik, scroll, atau sentuh)
  let audioStarted = false;

  function startAudioOnInteraction() {
    if (audioStarted) return;
    audioStarted = true;
    audio.play().catch(() => {});
    // Hapus semua listener setelah berhasil
    document.removeEventListener('click',      startAudioOnInteraction);
    document.removeEventListener('scroll',     startAudioOnInteraction);
    document.removeEventListener('touchstart', startAudioOnInteraction);
    document.removeEventListener('keydown',    startAudioOnInteraction);
  }

  document.addEventListener('click',      startAudioOnInteraction, { passive: true });
  document.addEventListener('scroll',     startAudioOnInteraction, { passive: true });
  document.addEventListener('touchstart', startAudioOnInteraction, { passive: true });
  document.addEventListener('keydown',    startAudioOnInteraction, { passive: true });
}


/* ============================================================
   7. SMOOTH SCROLL — untuk browser lama
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
