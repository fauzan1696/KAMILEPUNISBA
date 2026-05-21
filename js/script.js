/**
 * KAMIL STUDIO — script.js
 */

/* ============================================================
   1. FOOTER — Auto Year
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();


/* ============================================================
   2. NAVBAR — Scroll Effect
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


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
   4. ACTIVE NAV LINK
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const allLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  allLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });


/* ============================================================
   5. SCROLL ANIMATION
   ============================================================ */
const animatedEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => scrollObserver.observe(el));


/* ============================================================
   6. AUDIO — Tombol sekali klik, lalu hilang
   ============================================================
   Browser memblokir autoplay dengan suara. Solusi: tampilkan
   tombol kecil "♪ PLAY MUSIC" di pojok kanan bawah. Saat user
   klik, musik mulai dan tombol menghilang selamanya.
   ============================================================ */
const audio = document.getElementById('bg-audio');

if (audio) {
  audio.volume = 0.35;

  // Buat tombol prompt
  const prompt = document.createElement('button');
  prompt.className = 'music-prompt';
  prompt.innerHTML = '<span class="mp-icon">♪</span><span>Play Music</span>';
  document.body.appendChild(prompt);

  function startMusic() {
    audio.play().then(() => {
      // Musik berhasil play — sembunyikan tombol
      prompt.classList.add('hide');
      setTimeout(() => prompt.remove(), 700);
    }).catch(() => {});
  }

  prompt.addEventListener('click', startMusic);

  // Juga coba autoplay saat pertama kali user scroll/sentuh
  // (beberapa browser mengizinkan ini)
  let tried = false;
  function tryAutoplay() {
    if (tried) return;
    tried = true;
    audio.play().then(() => {
      prompt.classList.add('hide');
      setTimeout(() => prompt.remove(), 700);
    }).catch(() => {
      // Gagal — biarkan tombol tetap tampil
      tried = false;
    });
  }

  document.addEventListener('scroll',     tryAutoplay, { once: true, passive: true });
  document.addEventListener('touchstart', tryAutoplay, { once: true, passive: true });
}


/* ============================================================
   7. SMOOTH SCROLL
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
