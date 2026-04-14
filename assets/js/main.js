/* ===== NAV TOGGLE ===== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle?.addEventListener('click', () => navMenu.classList.toggle('show'));

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show'));
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

/* ===== HEADER SCROLL EFFECT ===== */
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
    backToTop?.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    backToTop?.classList.remove('visible');
  }
});

/* ===== TYPEWRITER EFFECT ===== */
const roles = [
  'DevOps Engineer',
  'SRE Engineer',
  'Cloud Architect',
  'Infrastructure Automator',
  'Kubernetes Enthusiast',
  'CI/CD Pipeline Builder',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter-text');

function typeWriter() {
  if (!typeEl) return;
  const current = roles[roleIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

/* ===== ANIMATED COUNTER ===== */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = target % 1 !== 0;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
  }, 16);
}

/* ===== SKILL BAR ANIMATION ===== */
function animateSkillBars() {
  document.querySelectorAll('.skills__bar-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}

/* ===== INTERSECTION OBSERVER ===== */
const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Counters
      entry.target.querySelectorAll('.about__stat-number').forEach(animateCounter);
      // Skill bars
      if (entry.target.id === 'skills') animateSkillBars();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(s => observer.observe(s));

/* ===== EMAILJS CONFIG (injected by CI/CD pipeline) ===== */
const EMAILJS_SERVICE_ID  = '__EMAILJS_SERVICE_ID__';
const EMAILJS_TEMPLATE_ID = '__EMAILJS_TEMPLATE_ID__';
const EMAILJS_PUBLIC_KEY  = '__EMAILJS_PUBLIC_KEY__';

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Load EmailJS SDK
(function () {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => emailjs.init(EMAILJS_PUBLIC_KEY);
  document.head.appendChild(script);
})();

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="uil uil-spinner-alt"></i> Sending...';
  btn.disabled = true;
  formStatus.textContent = '';

  // Fallback: if running locally without injected keys, show a friendly message
  if (EMAILJS_SERVICE_ID.startsWith('__')) {
    setTimeout(() => {
      formStatus.style.color = '#fb923c';
      formStatus.textContent = '⚠ EmailJS not configured yet. Deploy via GitHub Actions to enable.';
      btn.innerHTML = '<i class="uil uil-message"></i> Send Message';
      btn.disabled = false;
    }, 800);
    return;
  }

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      formStatus.style.color = 'var(--first-color)';
      formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
      form.reset();
      setTimeout(() => { formStatus.textContent = ''; }, 6000);
    })
    .catch((err) => {
      formStatus.style.color = '#f87171';
      formStatus.textContent = '✗ Something went wrong. Email me directly at work.vinay.y@gmail.com';
      console.error('EmailJS error:', err);
    })
    .finally(() => {
      btn.innerHTML = '<i class="uil uil-message"></i> Send Message';
      btn.disabled = false;
    });
});

/* ===== SCROLL REVEAL ===== */
const sr = ScrollReveal({
  origin: 'bottom',
  distance: '40px',
  duration: 800,
  delay: 100,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
});

sr.reveal('.home__data', { origin: 'left' });
sr.reveal('.home__img', { origin: 'right', delay: 200 });
sr.reveal('.home__social', { delay: 300, interval: 100 });
sr.reveal('.about__img-wrapper', { origin: 'left' });
sr.reveal('.about__data', { origin: 'right', delay: 200 });
sr.reveal('.about__stat', { interval: 100 });
sr.reveal('.skills__category', { interval: 100 });
sr.reveal('.skills__bars-wrapper', { delay: 200 });
sr.reveal('.timeline__item', { interval: 150 });
sr.reveal('.cert__card', { interval: 100 });
sr.reveal('.contact__info', { origin: 'left' });
sr.reveal('.contact__form', { origin: 'right', delay: 200 });
