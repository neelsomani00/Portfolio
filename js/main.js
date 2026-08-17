/* ============================================================
   NEEL SOMANI — PORTFOLIO
   Shared JS. Every feature checks the DOM before running,
   so it's safe to include this file on every page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof gsap !== 'undefined';
  if (hasGSAP && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  /* ---------- Preloader (plays once, then remembered via localStorage) ---------- */
  const preloader = document.getElementById('preloader');
  const preloaderAlreadySeen = !!localStorage.getItem('ns_preloader_seen');

  if (preloader && !preloaderAlreadySeen) {
    const plfill = document.getElementById('plfill');
    const plpct = document.getElementById('plpct');
    let p = 0;
    const plInt = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(plInt);
        setTimeout(() => {
          preloader.classList.add('hide');
          document.body.style.cursor = window.innerWidth > 900 ? 'none' : 'auto';
          try { localStorage.setItem('ns_preloader_seen', '1'); } catch (e) {}
          runHeroIntro();
        }, 260);
      }
      if (plfill) plfill.style.width = p + '%';
      if (plpct) plpct.textContent = String(Math.floor(p)).padStart(2, '0') + '%';
    }, 140);
  } else {
    // Either no preloader on this page, or it's already been seen —
    // make sure it's hidden and jump straight to the hero animation.
    if (preloader) preloader.style.display = 'none';
    document.body.style.cursor = window.innerWidth > 900 ? 'none' : 'auto';
    runHeroIntro();
  }

  /* ---------- Custom cursor ---------- */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const gridGlow = document.getElementById('grid-glow');
  if (dot && ring) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      if (gridGlow) {
        gridGlow.style.setProperty('--mx', mx + 'px');
        gridGlow.style.setProperty('--my', my + 'px');
      }
    });
    (function ringLoop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(ringLoop);
    })();
    document.querySelectorAll('a, button, .price-card, .service-card, .project-row, .faq-q').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('big'));
      el.addEventListener('mouseleave', () => ring.classList.remove('big'));
    });
  }

  /* ---------- Scroll progress + header state ---------- */
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    if (progress) {
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = pct + '%';
    }
    if (header) header.classList.toggle('scrolled', h.scrollTop > 10);
  });

  /* ---------- Mobile nav ---------- */
  const mnav = document.getElementById('mnav');
  const burgerBtn = document.getElementById('burgerBtn');
  const mcloseBtn = document.getElementById('mcloseBtn');
  if (mnav && burgerBtn) {
    burgerBtn.addEventListener('click', () => mnav.classList.add('open'));
    if (mcloseBtn) mcloseBtn.addEventListener('click', () => mnav.classList.remove('open'));
    mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mnav.classList.remove('open')));
  }

  /* ---------- Corner frames ---------- */
  document.querySelectorAll('.frame').forEach(el => {
    ['tl', 'tr', 'bl', 'br'].forEach(c => {
      const s = document.createElement('span');
      s.className = 'corner ' + c;
      el.appendChild(s);
    });
  });

  /* ---------- Hero headline split + intro (index only) ---------- */
  function runHeroIntro() {
    const heading = document.getElementById('heroHeading');
    if (!heading) return;
    const words = heading.textContent.trim().split(' ');
    heading.innerHTML = '';
    words.forEach((w, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'word';
      const inner = document.createElement('span');
      inner.textContent = w + (i < words.length - 1 ? '\u00A0' : '');
      if (w.toLowerCase().includes('interactive')) inner.classList.add('accent');
      wrap.appendChild(inner);
      heading.appendChild(wrap);
    });

    if (reduceMotion || !hasGSAP) {
      document.querySelectorAll('.hero h1 .word > span').forEach(s => s.style.transform = 'none');
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: .01 })
      .to('.hero h1 .word > span', { y: '0%', duration: 1, stagger: 0.055 }, 0.05)
      .from('.hero-sub', { opacity: 0, y: 20, duration: .9 }, '-=0.5')
      .from('.hero-ctas', { opacity: 0, y: 20, duration: .9 }, '-=0.6')
      .from('.hero-links a', { opacity: 0, y: 14, duration: .6, stagger: 0.06 }, '-=0.6')
      .from('.hero-chips .pill', { opacity: 0, y: 14, duration: .6, stagger: 0.05 }, '-=0.5')
      .from('.hero-photo-wrap', { opacity: 0, scale: .92, duration: 1.1, ease: 'power3.out' }, 0.2)
      .from('.scroll-hint', { opacity: 0, duration: .6 }, '-=0.3');
  }

  /* ---------- Page-hero (inner pages) simple intro ---------- */
  if (hasGSAP && !reduceMotion && document.querySelector('.page-hero')) {
    gsap.from('.page-hero .crumb', { opacity: 0, y: 12, duration: .7, ease: 'power3.out' });
    gsap.from('.page-hero h1', { opacity: 0, y: 26, duration: .9, ease: 'power3.out', delay: .08 });
    gsap.from('.page-hero p', { opacity: 0, y: 20, duration: .9, ease: 'power3.out', delay: .18 });
  }

  /* ---------- Generic scroll reveals ---------- */
  if (hasGSAP) {
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
    gsap.utils.toArray('.get-list li, .pstep, .price-card, .service-card, .project-row').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
    gsap.utils.toArray('.eyebrow').forEach(el => {
      gsap.from(el, { opacity: 0, x: -14, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }

  /* ---------- Process connecting line, scroll-scrubbed ---------- */
  const procLine = document.getElementById('procLine');
  if (procLine && hasGSAP) {
    function sizeProcLine() {
      const wrap = document.querySelector('.process-line-svg');
      if (!wrap) return;
      const w = wrap.getBoundingClientRect().width;
      procLine.setAttribute('x2', w);
      procLine.setAttribute('y2', 1);
    }
    sizeProcLine();
    window.addEventListener('resize', sizeProcLine);
    gsap.fromTo(procLine, { attr: { x2: 0 } }, {
      attr: { x2: () => document.querySelector('.process-line-svg').getBoundingClientRect().width },
      ease: 'none',
      scrollTrigger: { trigger: '.process-wrap', start: 'top 70%', end: 'bottom 60%', scrub: 1 }
    });
  }

  /* ---------- Skills count-up + bar fill ---------- */
  document.querySelectorAll('.skill-row').forEach(row => {
    const pct = parseInt(row.dataset.pct, 10);
    const fill = row.querySelector('.skill-fill');
    const num = row.querySelector('.num');
    if (!hasGSAP) { fill.style.width = pct + '%'; num.textContent = pct; return; }
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: row, start: 'top 85%', once: true,
      onEnter: () => {
        gsap.to(fill, { width: pct + '%', duration: 1.4, ease: 'power3.out' });
        gsap.to(obj, { v: pct, duration: 1.4, ease: 'power3.out', onUpdate: () => { num.textContent = Math.round(obj.v); } });
      }
    });
  });

  /* ---------- Testimonials carousel ---------- */
  const testSlide = document.getElementById('testSlide');
  if (testSlide) {
    const testimonials = [
      { quote: "Clean design, fast delivery, and communicates clearly. Would hire again.", name: "Pihu Itoriya", role: "Exporter" },
      { quote: "Loved the micro-interactions and attention to accessibility.", name: "Swapnil Mishra", role: "Computer teacher" },
      { quote: "Turned rough ideas into a polished product in days.", name: "Aarush Jain", role: "Freelancer" }
    ];
    let tIndex = 0;
    const testQuote = document.getElementById('testQuote');
    const testAuthor = document.getElementById('testAuthor');
    const testDots = document.querySelectorAll('#testDots i');
    function showTest(i, dir) {
      tIndex = (i + testimonials.length) % testimonials.length;
      const t = testimonials[tIndex];
      if (hasGSAP) {
        gsap.to('#testSlide', {
          opacity: 0, x: dir === 'next' ? -16 : 16, duration: .3, onComplete: () => {
            testQuote.textContent = t.quote;
            testAuthor.innerHTML = '<b>' + t.name + '</b> — ' + t.role;
            gsap.fromTo('#testSlide', { opacity: 0, x: dir === 'next' ? 16 : -16 }, { opacity: 1, x: 0, duration: .4 });
          }
        });
      } else {
        testQuote.textContent = t.quote;
        testAuthor.innerHTML = '<b>' + t.name + '</b> — ' + t.role;
      }
      testDots.forEach(d => d.classList.remove('active'));
      if (testDots[tIndex]) testDots[tIndex].classList.add('active');
    }
    const nextBtn = document.getElementById('testNext');
    const prevBtn = document.getElementById('testPrev');
    if (nextBtn) nextBtn.addEventListener('click', () => showTest(tIndex + 1, 'next'));
    if (prevBtn) prevBtn.addEventListener('click', () => showTest(tIndex - 1, 'prev'));
    testDots.forEach(d => d.addEventListener('click', () => showTest(parseInt(d.dataset.i, 10), 'next')));
    let testAuto = setInterval(() => showTest(tIndex + 1, 'next'), 6000);
    testSlide.closest('.test-wrap').addEventListener('mouseenter', () => clearInterval(testAuto));
    testSlide.closest('.test-wrap').addEventListener('mouseleave', () => { testAuto = setInterval(() => showTest(tIndex + 1, 'next'), 6000); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form -> Formspree (AJAX) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusBox = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const action = contactForm.getAttribute('action') || '';

      // Placeholder guard: tell the site owner to plug in their real Formspree ID.
      if (action.includes('YOUR_FORM_ID')) {
        if (statusBox) {
          statusBox.textContent = 'Contact form is not connected yet — replace YOUR_FORM_ID in contact.html with your real Formspree form ID.';
          statusBox.className = 'form-status show err';
        }
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          contactForm.reset();
          if (statusBox) {
            statusBox.textContent = "Message sent — I'll reply within 24 hours.";
            statusBox.className = 'form-status show ok';
          }
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        if (statusBox) {
          statusBox.textContent = "Something went wrong sending that — email me directly at neelsomani00@gmail.com instead.";
          statusBox.className = 'form-status show err';
        }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
      }
    });
  }

  /* ---------- Hero "lens" selector (home page only) ---------- */
  const lensTags = document.querySelectorAll('.lens-tag');
  const lensCta = document.getElementById('lensCta');
  if (lensTags.length && lensCta) {
    const routes = {
      hiring: { text: 'View Resume', href: 'resume.html' },
      freelance: { text: 'See Pricing', href: 'pricing.html' },
      browsing: { text: 'View Work', href: 'work.html' }
    };
    lensTags.forEach(tag => {
      tag.addEventListener('click', () => {
        lensTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        const key = tag.dataset.lens;
        const route = routes[key];
        if (route) {
          lensCta.textContent = route.text + ' ';
          const icon = document.createElement('svg');
          icon.setAttribute('viewBox', '0 0 14 14');
          icon.innerHTML = '<path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" stroke-width="1.6" fill="none"/>';
          lensCta.appendChild(icon);
          lensCta.setAttribute('href', route.href);
        }
      });
    });
  }

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Service card tilt ---------- */
  if (hasGSAP && !reduceMotion) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        gsap.to(card, { rotateX: py * -4, rotateY: px * 4, duration: .4, ease: 'power2.out', transformPerspective: 600 });
      });
      card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: .6 }));
    });
  }

});
