// ============================================
// CRAFTLABS 3D — SCRIPTS
// ============================================

// ─── NAV SCROLL ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── MOBILE NAV TOGGLE ───
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(13,17,23,0.98)';
  navLinks.style.padding = '24px';
  navLinks.style.gap = '20px';
  navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = 'none';
    }
  });
});

// ─── REVEAL ON SCROLL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

// Stagger cards
document.querySelectorAll('.servico-card, .material-card, .portfolio-item, .depoimento-card').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── WHATSAPP CTA ───
function sendWhatsApp() {
  const name = document.querySelector('input[placeholder*="João Silva"]')?.value || '';
  const contact = document.querySelector('input[placeholder*="joao@email.com"]')?.value || '';
  const type = document.querySelector('select')?.value || '';
  const description = document.querySelector('textarea')?.value || '';

  if (!name && !description) {
    alert('Preencha pelo menos seu nome e a descrição do projeto.');
    return;
  }

  const msg = `Olá! Vim pelo site da CraftLabs 3D.\n\n*Nome:* ${name}\n*Contato:* ${contact}\n*Tipo de projeto:* ${type}\n*Descrição:* ${description}`;
  const encoded = encodeURIComponent(msg);
  // Substitua pelo número real do WhatsApp (formato: 5511999999999)
  window.open(`https://wa.me/5596991901661?text=${encoded}`, '_blank');
}

// ─── PARALLAX HERO (leve) ───
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-sub');
  if (heroTitle && scrollY < window.innerHeight) {
    heroTitle.style.transform = `translateY(${scrollY * 0.15}px)`;
    if (heroSub) heroSub.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});
