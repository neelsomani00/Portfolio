// ========= Utilities (Fixed) =========
const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => [...ctx.querySelectorAll(q)];

// Smooth reading progress
const progressEl = $('#progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressEl.style.width = scrolled + '%';
}, { passive: true });

// Navbar shadow on scroll
const mainNav = $('#mainNav');
// Check if GSAP is available before using it
if (window.gsap && window.ScrollTrigger) {
  gsap.to(mainNav, {
    boxShadow: "var(--nav-shadow)",
    scrollTrigger: {
      trigger: "body",
      start: "top -=100", // When scroll past 100px
      end: "top -=101",
      toggleActions: "play none none reverse" // Add shadow on scroll down, remove on scroll up
    }
  });


  // Reveal on scroll with GSAP
  gsap.registerPlugin(ScrollTrigger);
  $$('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, translateY: 30 },
      {
        opacity: 1, translateY: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=100", // Start animation when 100px from bottom of viewport
          toggleActions: "play none none reverse", // play on enter, reverse on leave back up
        }
      }
    );
  });
}


// Magnetic buttons + ripple
$$('.magnetic').forEach(btn => {
  // Magnetic effect
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    if (window.gsap) {
      gsap.to(btn, { x: x * 8, y: y * 8, duration: 0.3, ease: "power2.out" });
    }
  });
  btn.addEventListener('mouseleave', () => {
    if (window.gsap) {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    }
  });

  // Ripple effect
  btn.addEventListener('click', function (ev) {
    const circle = document.createElement('span');
    const d = Math.max(this.clientWidth, this.clientHeight);
    circle.style.cssText = `position:absolute;width:${d}px;height:${d}px;left:${ev.offsetX - d / 2}px;top:${ev.offsetY - d / 2}px;border-radius:50%;background:rgba(255,255,255,.35);pointer-events:none;`;
    this.append(circle);
    if (window.gsap) {
      gsap.fromTo(circle, { scale: 0, opacity: 0.85 }, { scale: 2.6, opacity: 0, duration: 0.65, ease: "power2.out", onComplete: () => circle.remove() });
    } else {
      circle.remove(); // Remove immediately if GSAP is not available
    }
  });
});

// Tilt for .tilt (GSAP for smoother reset)
$$('.tilt').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    if (window.gsap) {
      gsap.to(el, { rotationX: (-y * 6).toFixed(2), rotationY: (x * 6).toFixed(2), translateY: -6, scale: 1.02, duration: 0.3, ease: "power2.out" });
    }
  });
  el.addEventListener('mouseleave', () => {
    if (window.gsap) {
      gsap.to(el, { rotationX: 0, rotationY: 0, translateY: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    }
  });
});

// Command palette (Ctrl/⌘+K)
const palette = document.createElement('dialog');
palette.className = 'cmdk';
palette.style.cssText = 'position:fixed;inset:0;display:grid;place-items:start center;padding-top:15vh;z-index:90;background:rgba(0,0,0,.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display:none;'; // Adjusted for blur and initial hidden
palette.innerHTML = `
  <div class="glass" style="width:min(720px,92vw);padding:12px;border-radius:16px; box-shadow: var(--shadow-2);">
    <input class="cmdk-input" placeholder="Type to jump • e.g. pricing" aria-label="Command" style="width:100%;padding:14px 16px;font:600 16px/1.2 ui-monospace,Menlo; border:1px solid var(--glass-brd); border-radius:12px; background:var(--glass); color:var(--txt); outline:none;"/>
    <div class="cmdk-list" style="margin-top:10px; max-height:50vh; overflow:auto;">
      <div class="cmdk-item" data-goto="#about">About</div>
      <div class="cmdk-item" data-goto="#services">Services</div>
      <div class="cmdk-item" data-goto="#skills">Skills</div>
      <div class="cmdk-item" data-goto="#projects">Projects</div>
      <div class="cmdk-item" data-goto="#process">Process</div>
      <div class="cmdk-item" data-goto="#pricing">Pricing</div>
      <div class="cmdk-item" data-goto="#testimonials">Testimonials</div>
      <div class="cmdk-item" data-goto="#faqs">FAQs</div>
      <div class="cmdk-item" data-goto="#contact">Contact</div>
    </div>
  </div>`;
document.body.appendChild(palette);
const cmdInput = palette.querySelector('.cmdk-input');

function openPalette() {
  palette.style.display = 'grid'; // Change display to grid to show it
  if (window.gsap) {
    gsap.fromTo(palette.querySelector('.glass'),
      { opacity: 0, translateY: -50 },
      {
        opacity: 1, translateY: 0, duration: 0.4, ease: "power3.out",
        onComplete: () => cmdInput.focus()
      });
  } else {
    cmdInput.focus();
  }
}

function closePalette() {
  if (window.gsap) {
    gsap.to(palette.querySelector('.glass'),
      {
        opacity: 0, translateY: -50, duration: 0.3, ease: "power3.in",
        onComplete: () => {
          palette.style.display = 'none'; // Hide after animation
          cmdInput.value = '';
          palette.querySelectorAll('.cmdk-item').forEach(i => i.style.display = ''); // Reset filters
        }
      });
  } else {
    palette.style.display = 'none';
    cmdInput.value = '';
    palette.querySelectorAll('.cmdk-item').forEach(i => i.style.display = '');
  }
}

addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (palette.style.display === 'none' || palette.style.display === '') openPalette();
    else closePalette();
  }
  if (e.key === 'Escape' && palette.style.display === 'grid') closePalette();
});

// Make Ctrl+K button clickable
const ctrlkBtn = $('#ctrlk-btn');
if (ctrlkBtn) {
  ctrlkBtn.addEventListener('click', openPalette);
}

palette.addEventListener('click', e => { if (e.target === palette) closePalette(); });
palette.querySelectorAll('.cmdk-item').forEach(i => i.addEventListener('click', () => {
  location.hash = i.dataset.goto;
  closePalette();
}));
cmdInput.addEventListener('input', () => {
  const q = cmdInput.value.toLowerCase().trim();
  palette.querySelectorAll('.cmdk-item').forEach(i => i.style.display = i.textContent.toLowerCase().includes(q) ? '' : 'none');
});

// Year
$('#year').textContent = new Date().getFullYear();

// ======= Theme toggle (with persistence + system default) =======
const root = document.documentElement;
const THEME_KEY = 'theme'; // Use 'theme' as key
function setTheme(t) {
  root.setAttribute('data-theme', t);
  // Swap icons based on current theme
  $('#icon-sun').style.display = (t === 'gradient') ? 'inline-block' : 'none'; // Sun for gradient
  $('#icon-moon').style.display = (t === 'dark') ? 'inline-block' : 'none'; // Moon for dark
  // Update avatar image based on theme (Using the same image for both themes as in the original code)
  const avatarImg = $('.avatar img');
  if (avatarImg) {
    // You might need to change the path below if your image is in a subfolder!
    avatarImg.src = "NEEL.jpg"; 
  }
}

// Set initial theme on load
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem(THEME_KEY);

if (storedTheme) {
  setTheme(storedTheme);
} else {
  setTheme(prefersDark ? 'dark' : 'gradient'); // Default to dark, fallback to gradient if no preference
}

$('#themeToggle').addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const nextTheme = (currentTheme === 'dark') ? 'gradient' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
});

// ======= Mobile menu =======
$('#menuToggle').addEventListener('click', () => {
  $('#menu').classList.toggle('open');
  // Animate hamburger icon
  const icon = $('#menuToggle svg');
  if (window.gsap) {
    if ($('#menu').classList.contains('open')) {
      gsap.to(icon.children[0], { y: 5, rotate: 45, duration: 0.3 });
      gsap.to(icon.children[1], { opacity: 0, duration: 0.3 });
      gsap.to(icon.children[2], { y: -5, rotate: -45, duration: 0.3 });
    } else {
      gsap.to(icon.children[0], { y: 0, rotate: 0, duration: 0.3 });
      gsap.to(icon.children[1], { opacity: 1, duration: 0.3 });
      gsap.to(icon.children[2], { y: 0, rotate: 0, duration: 0.3 });
    }
  }
});
$$('#menu a').forEach(a => a.addEventListener('click', () => {
  $('#menu').classList.remove('open');
  // Reset hamburger icon after selection
  const icon = $('#menuToggle svg');
  if (window.gsap) {
    gsap.to(icon.children[0], { y: 0, rotate: 0, duration: 0.3 });
    gsap.to(icon.children[1], { opacity: 1, duration: 0.3 });
    gsap.to(icon.children[2], { y: 0, rotate: 0, duration: 0.3 });
  }
}));


// ======= Skills meter animation on reveal (GSAP integration) =======
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const svg = e.target;
    const pct = +svg.getAttribute('data-pct');
    const r = 52;
    const C = 2 * Math.PI * r;
    const meter = svg.querySelector('.meter');
    meter.style.strokeDasharray = C; // Set once
    // Animate strokeDashoffset with GSAP
    if (window.gsap) {
      gsap.fromTo(meter,
        { strokeDashoffset: C },
        { strokeDashoffset: C * (1 - pct / 100), duration: 1.5, ease: "power3.out" }
      );
    }
    skillObs.unobserve(svg); // Unobserve after animation plays once
  })
}, { threshold: .4 });
$$('#skills svg').forEach(s => skillObs.observe(s));


// ======= Testimonials carousel =======
const track = $('#tTrack');
const slides = $$('#tTrack .slide');
const prev = $('.car-prev');
const next = $('.car-next');
const dots = $('#dots');
let idx = 0, timer;
function update() {
  const w = slides[0].offsetWidth + 18; // slide width + gap
  if (window.gsap) {
    gsap.to(track, { scrollLeft: idx * w, duration: 0.6, ease: "power2.out" }); // Use GSAP for smooth scroll
  } else {
    track.scrollLeft = idx * w; // Fallback if GSAP is missing
  }

  // dots
  dots.innerHTML = '';
  slides.forEach((_, i) => {
    const d = document.createElement('span'); d.className = 'dot' + (i === idx ? ' active' : ''); dots.appendChild(d);
  });
}
function go(n) { idx = (n + slides.length) % slides.length; update(); }
prev.addEventListener('click', () => go(idx - 1));
next.addEventListener('click', () => go(idx + 1));
function start() { stop(); timer = setInterval(() => go(idx + 1), 4500); }
function stop() { if (timer) clearInterval(timer); }
track.addEventListener('mouseenter', stop); track.addEventListener('mouseleave', start);
addEventListener('resize', update);
update(); start();

// ======= Hero section entry animation (Run only if GSAP is available) =======
if (window.gsap) {
  gsap.from(".hero-card .badge", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", delay: 0.2 });
  gsap.from(".hero-card h1", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", delay: 0.4 });
  gsap.from(".hero-card .sub", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", delay: 0.6 });
  gsap.from(".hero-card .cta .btn", { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.8 });
  gsap.from(".hero-card .cred", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", delay: 1.0 });
  gsap.from(".hero-card .avatar", { opacity: 0, scale: 0.8, duration: 1.0, ease: "power2.out", delay: 1.2 });


  // ======= Parallax hero orbs with GSAP ScrollTrigger =======
  gsap.to(".orb.one", {
    y: () => window.innerHeight * 0.05, // Reduced parallax strength slightly
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  gsap.to(".orb.two", {
    y: () => -window.innerHeight * 0.05, // Reduced parallax strength slightly
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Guarantee icon wiggle (using GSAP for subtle effect)
  $$('.guarantee ul li').forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { x: 5, repeat: 1, yoyo: true, duration: 0.1, ease: "power1.out" });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { x: 0, duration: 0.3, ease: "power2.out" });
    });
  });
}
