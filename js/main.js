/* ==========================================
   NovaStack - Premium Web Agency Website
   JavaScript Main File
   ========================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  const loadingScreen = document.getElementById('loading-screen');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1500);
  });

  // Fallback: hide after 4s if load event is slow
  setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 4000);

  // ==========================================
  // SCROLL PROGRESS BAR
  // ==========================================
  const progressBar = document.getElementById('scroll-progress-bar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // MOBILE MENU
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  mobileMenuBtn.addEventListener('click', () => {
    const isActive = mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // DARK MODE TOGGLE
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Check saved preference
  const savedTheme = localStorage.getItem('novastack-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('novastack-theme', newTheme);
  });

  // ==========================================
  // CUSTOM CURSOR
  // ==========================================
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .service-card, .portfolio-item, .pricing-card, .why-card, .faq-question');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--reveal-delay') || '0s';
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // ANIMATED COUNTERS
  // ==========================================
  const counters = document.querySelectorAll('.hero-stat .number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix, 2000);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, target, suffix, duration) {
    const start = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // ==========================================
  // RIPPLE BUTTON EFFECT
  // ==========================================
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // ==========================================
  // HERO MOCKUP PARALLAX (mouse move)
  // ==========================================
  const heroMockup = document.getElementById('hero-mockup');

  if (heroMockup && window.innerWidth > 992) {
    document.querySelector('.hero-visual').addEventListener('mousemove', (e) => {
      const rect = heroMockup.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = (x / rect.width) * 6;
      const rotateX = -(y / rect.height) * 4;
      heroMockup.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    document.querySelector('.hero-visual').addEventListener('mouseleave', () => {
      heroMockup.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg)';
    });
  }

  // ==========================================
  // PARTICLES (Canvas)
  // ==========================================
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resizeCanvas() {
      const hero = document.querySelector('.hero');
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor(canvas.width / 15));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      connectParticles();
      animFrameId = requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================
  // TESTIMONIALS CAROUSEL
  // ==========================================
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentSlide = 0;
  let autoplayInterval;
  const totalSlides = dots.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
      dot.setAttribute('aria-selected', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    resetAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    resetAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-index')));
      resetAutoplay();
    });
  });

  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();

  // Pause on hover
  const carousel = document.getElementById('testimonials-carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', () => startAutoplay());

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval);
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
    startAutoplay();
  }, { passive: true });

  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(f => {
        f.classList.remove('active');
        f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================================
  // CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.style.background = type === 'success' ? 'var(--accent-emerald)' : '#EF4444';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Simple email validation
    if (!email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Success simulation
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      showToast('Thank you! We\'ll get back to you within 24 hours. 🎉');
      contactForm.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1500);
  });

  // ==========================================
  // NEWSLETTER FORM
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input.value.trim()) {
      showToast('Subscribed! Welcome to NovaStack updates. 🎉');
      input.value = '';
    }
  });

  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // SERVICE CARDS: FLOATING ANIMATION
  // ==========================================
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card, index) => {
    card.style.setProperty('--float-delay', `${index * 0.1}s`);
  });

  // ==========================================
  // PORTFOLIO TILT EFFECT (desktop only)
  // ==========================================
  if (window.innerWidth > 992) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        item.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }

  // ==========================================
  // INTERSECTION OBSERVER FOR PROCESS STEPS
  // ==========================================
  const processSteps = document.querySelectorAll('.process-step');
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        processObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  processSteps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    processObserver.observe(step);
  });

  // ==========================================
  // SMOOTH COUNTER ANIMATION ON PRICING
  // ==========================================
  // No additional code needed

  // ==========================================
  // CONSOLE BRANDING
  // ==========================================
  console.log('%c NovaStack 🚀 ', 'background:#059669;color:white;font-size:18px;font-weight:bold;padding:10px 20px;border-radius:4px;font-family:sans-serif');
  console.log('%c Helping American businesses grow with high-converting websites. ', 'font-size:14px;padding:5px 10px;');

  console.log('%c ⚡ Designed & Developed by NovaStack ', 'background:#111827;color:#10B981;font-size:12px;padding:8px 16px;border-radius:4px;');

});
