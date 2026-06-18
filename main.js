// Cursor glow
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// Nav scroll state
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Active nav links
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
function updateNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-section') === current);
  });
}
window.addEventListener('scroll', updateNav);
updateNav();

navLinks.forEach(l => {
  l.addEventListener('click', e => {
    e.preventDefault();
    const el = document.getElementById(l.getAttribute('data-section'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 80 + 'ms';
  revealObserver.observe(el);
});

// Animate skill bars when visible
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        setTimeout(() => fill.classList.add('animated'), 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bento-card').forEach(card => barObserver.observe(card));

// Form handler
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const txt = document.getElementById('submitText');
    btn.disabled = true;
    txt.textContent = 'Sending...';
    await new Promise(r => setTimeout(r, 1500));
    txt.textContent = 'Message Sent! ✓';
    btn.style.background = 'linear-gradient(135deg, #2f2ebe, #4647d3)';
    form.reset();
    setTimeout(() => {
      btn.disabled = false;
      txt.textContent = 'Send Message →';
      btn.style.background = '';
    }, 3000);
  });
}

// Fade in on load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
