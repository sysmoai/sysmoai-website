/* ==========================================
   SYSmoAI — Main Script
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== PRELOADER ========== */
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      initAnimations();
    }
  }, 2200);
  document.body.style.overflow = 'hidden';

  /* ========== SCROLL PROGRESS BAR ========== */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ========== CUSTOM CURSOR ========== */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (cursor && follower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let fX = 0, fY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animFollower() {
      fX += (mouseX - fX) * 0.12;
      fY += (mouseY - fY) * 0.12;
      follower.style.left = fX + 'px';
      follower.style.top = fY + 'px';
      requestAnimationFrame(animFollower);
    }
    animFollower();

    document.querySelectorAll('a, button, .tab-btn, .faq-question, .sub-tab-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.borderColor = 'var(--cyan)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.borderColor = 'var(--violet)';
      });
    });
  }

  /* ========== NAVBAR ========== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
    updateActiveNav();
  }, { passive: true });

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        closeMobileMenu();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ========== HAMBURGER MENU ========== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    hamburger && hamburger.classList.remove('active');
    mobileMenu && mobileMenu.classList.remove('open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu && mobileMenu.classList.toggle('open');
    });
  }

  /* ========== TYPEWRITER EFFECT ========== */
  const typedEl = document.getElementById('typed-text');
  const phrases = [
    "Is your business still running on manual chaos?",
    "Are AI tools leaving you more confused than before?",
    "Is your team drowning in WhatsApp messages and missed follow-ups?",
    "Is your income dropping while AI takes over entry-level work?"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeTimeout;

  function typeWriter() {
    if (!typedEl) return;
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        typeTimeout = setTimeout(typeWriter, 2200);
        return;
      }
    } else {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    typeTimeout = setTimeout(typeWriter, isDeleting ? 35 : 55);
  }
  typeWriter();

  /* ========== TSPARTICLES (HERO) ========== */
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("particles-hero", {
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        /* Official SYSmoAI® brand blue particle system */
        color: { value: ["#2563EB", "#3B82F6", "#60A5FA", "#1E3A8A"] },
        shape: { type: "circle" },
        opacity: {
          value: 0.35,
          random: true,
          animation: { enable: true, speed: 0.8, minimumValue: 0.05, sync: false }
        },
        size: {
          value: { min: 1, max: 2.5 },
          random: true
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" }
        },
        links: {
          enable: true,
          distance: 150,
          color: "#2563EB",
          opacity: 0.12,
          width: 1
        }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: false }
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.4 } }
        }
      },
      detectRetina: true
    }).catch(() => {});
  }

  /* ========== AOS INIT (after preloader) ========== */
  function initAnimations() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60
      });
    }
    initCounters();
    initSkillBadges();
    initGSAP();
  }

  /* ========== COUNTUP ON SCROLL ========== */
  function initCounters() {
    const counters = document.querySelectorAll('.counter-number, .stat-number, .rstat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count || '0', 10);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  /* ========== SKILL BADGES ANIMATION ========== */
  function initSkillBadges() {
    const badges = document.querySelectorAll('.badge');
    const badgeObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        badges.forEach((b, i) => {
          b.style.animationDelay = (i * 80) + 'ms';
        });
        badgeObserver.disconnect();
      }
    }, { threshold: 0.3 });
    const badgeContainer = document.getElementById('skill-badges');
    if (badgeContainer) badgeObserver.observe(badgeContainer);
  }

  /* ========== GSAP (PROCESS STEPS) ========== */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Animate process steps
    const steps = document.querySelectorAll('.process-step');
    steps.forEach((step, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.15,
        ease: "power2.out"
      });
    });

    // Story cards parallax
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        x: i % 2 === 0 ? -30 : 30,
        opacity: 0,
        duration: 0.7,
        delay: (i % 3) * 0.1,
        ease: "power2.out"
      });
    });

    // Hero before/after visual
    const bfaEl = document.querySelector('.hero-before-after');
    if (bfaEl) {
      gsap.from('.hero-before-after', {
        scrollTrigger: { trigger: '.hero-before-after', start: "top 90%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
      });
    }
  }

  /* ========== AUDIENCE TABS ========== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.querySelector(`.tab-panel[data-tab-panel="${idx}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  /* ========== BUSINESS SUB-TABS ========== */
  const subBtns = document.querySelectorAll('.sub-tab-btn');
  const subPanels = document.querySelectorAll('.sub-tab-panel');

  subBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.sub;
      subBtns.forEach(b => b.classList.remove('active'));
      subPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.querySelector(`.sub-tab-panel[data-sub-panel="${idx}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  /* ========== PRICING TOGGLE ========== */
  const btnBD = document.getElementById('btn-bd');
  const btnIntl = document.getElementById('btn-intl');
  const bdPrices = document.querySelectorAll('.bd-price');
  const intlPrices = document.querySelectorAll('.intl-price');

  if (btnBD) {
    btnBD.addEventListener('click', () => {
      btnBD.classList.add('active');
      btnIntl && btnIntl.classList.remove('active');
      bdPrices.forEach(p => p.classList.remove('hidden'));
      intlPrices.forEach(p => p.classList.add('hidden'));
    });
  }
  if (btnIntl) {
    btnIntl.addEventListener('click', () => {
      btnIntl.classList.add('active');
      btnBD && btnBD.classList.remove('active');
      intlPrices.forEach(p => p.classList.remove('hidden'));
      bdPrices.forEach(p => p.classList.add('hidden'));
    });
  }

  /* ========== FAQ ACCORDION ========== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => {
          i.classList.remove('open');
          const a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = '0';
        });
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  /* ========== SWIPER (TESTIMONIALS) ========== */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  /* ========== VIDEO MODAL ========== */
  const openVideoModal = document.getElementById('open-video-modal');
  const videoModal = document.getElementById('video-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  function openModal() {
    if (videoModal) {
      videoModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeModal() {
    if (videoModal) {
      videoModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  openVideoModal && openVideoModal.addEventListener('click', openModal);
  modalOverlay && modalOverlay.addEventListener('click', closeModal);
  modalClose && modalClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ========== INLINE VIDEO PLAYER ========== */
  const loadVideo = document.getElementById('load-video');
  const ytFrame = document.getElementById('yt-frame');
  const videoWrapper = document.getElementById('video-wrapper');

  if (loadVideo) {
    loadVideo.addEventListener('click', () => {
      if (ytFrame && videoWrapper) {
        const thumb = videoWrapper.querySelector('.video-thumbnail');
        if (thumb) thumb.style.display = 'none';
        ytFrame.classList.remove('hidden');
        ytFrame.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }
    });
  }

  /* ========== CONTACT FORM ========== */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const contact = document.getElementById('cf-contact').value.trim();
      const problem = document.getElementById('cf-problem').value.trim();

      if (!name || !contact || !problem) {
        alert('Please fill in all fields.');
        return;
      }

      // Send via WhatsApp
      const typeEl = document.getElementById('cf-type');
      const type = typeEl ? typeEl.value : '';
      const msg = `Hi Emon! I filled out the SYSmoAI contact form.\n\nName: ${name}\nContact: ${contact}\nI am a: ${type || 'Not specified'}\n\nBiggest Problem: ${problem}`;
      window.open(`https://wa.me/8801711638693?text=${encodeURIComponent(msg)}`, '_blank');

      contactForm.classList.add('hidden');
      if (formSuccess) formSuccess.classList.remove('hidden');
    });
  }

  /* ========== LOTTIE BACKGROUND ========== */
  const lottieContainer = document.getElementById('lottie-story-bg');
  if (lottieContainer && typeof LottiePlayer !== 'undefined') {
    const player = document.createElement('lottie-player');
    player.setAttribute('src', 'https://assets1.lottiefiles.com/packages/lf20_fcfjwiyb.json');
    player.setAttribute('background', 'transparent');
    player.setAttribute('speed', '0.7');
    player.setAttribute('loop', '');
    player.setAttribute('autoplay', '');
    player.style.cssText = 'width: 100%; height: 100%; position: absolute; inset: 0;';
    lottieContainer.appendChild(player);
  }

  /* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ========== MEGA-MENU / FOOTER TAB LINKS ========== */
  function openTabAndScroll(tabIndex, subIndex) {
    const panel = document.getElementById('who-we-help');
    if (!panel) return;

    // Activate main tab
    const tabBtns2 = document.querySelectorAll('.tab-btn');
    const tabPanels2 = document.querySelectorAll('.tab-panel');
    tabBtns2.forEach(b => b.classList.remove('active'));
    tabPanels2.forEach(p => p.classList.remove('active'));
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabIndex}"]`);
    const targetPanel = document.querySelector(`.tab-panel[data-tab-panel="${tabIndex}"]`);
    if (targetBtn) targetBtn.classList.add('active');
    if (targetPanel) targetPanel.classList.add('active');

    // Activate sub-tab if provided
    if (subIndex !== undefined && subIndex !== null) {
      const subBtns2 = document.querySelectorAll('.sub-tab-btn');
      const subPanels2 = document.querySelectorAll('.sub-tab-panel');
      subBtns2.forEach(b => b.classList.remove('active'));
      subPanels2.forEach(p => p.classList.remove('active'));
      const targetSubBtn = document.querySelector(`.sub-tab-btn[data-sub="${subIndex}"]`);
      const targetSubPanel = document.querySelector(`.sub-tab-panel[data-sub-panel="${subIndex}"]`);
      if (targetSubBtn) targetSubBtn.classList.add('active');
      if (targetSubPanel) targetSubPanel.classList.add('active');
    }

    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  document.querySelectorAll('[data-open-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      const tabIdx = el.dataset.openTab;
      const subIdx = el.dataset.openSub;
      const href = el.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMobileMenu();
        openTabAndScroll(tabIdx, subIdx !== undefined ? subIdx : null);
      }
    });
  });

  /* ========== MOBILE ACCORDION (SOLUTIONS) ========== */
  const mobileAccBtn = document.getElementById('mobile-solutions-btn');
  const mobileAccPanel = document.getElementById('mobile-solutions-panel');
  if (mobileAccBtn && mobileAccPanel) {
    mobileAccBtn.addEventListener('click', () => {
      const isOpen = mobileAccPanel.classList.contains('open');
      mobileAccPanel.classList.toggle('open', !isOpen);
      mobileAccBtn.classList.toggle('open', !isOpen);
    });
  }

  /* ========== SERVICE CARD MOBILE FALLBACK ========== */
  // On mobile, show service back content in a toggle
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.service-card-wrapper').forEach(wrapper => {
      const back = wrapper.querySelector('.service-back');
      const front = wrapper.querySelector('.service-front');
      if (back && front) {
        back.style.cssText = '';
        back.style.display = 'block';
        back.style.position = 'relative';
        back.style.inset = 'auto';
        back.style.transform = 'none';
        back.style.backfaceVisibility = 'visible';
        back.style.borderTop = '1px solid var(--border)';
        back.style.borderRadius = '0 0 var(--radius) var(--radius)';
        front.style.position = 'relative';
        front.style.inset = 'auto';
        front.style.borderRadius = 'var(--radius) var(--radius) 0 0';
      }
    });
  }

  /* ========== INTERSECTION OBSERVER — LAZY EFFECTS ========== */
  const lazyEls = document.querySelectorAll('[data-aos]');
  if (typeof AOS === 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    lazyEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

});
