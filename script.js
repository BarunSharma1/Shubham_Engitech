document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     PRELOADER
     ============================================================ */
  const preloader = document.getElementById('preloader');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
    triggerReveal();
    if (typeof animateCounters === 'function') animateCounters();
  }, 800);



  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (window.matchMedia('(pointer: fine)').matches && dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    });

    (function followLoop() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(followLoop);
    })();

    document.querySelectorAll('a, button, input, textarea, .srv-card, .team-card, .client-logo-item, .contact-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });
  }

  /* ============================================================
     HEADER — scroll class + mobile menu
     ============================================================ */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nm-link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', open);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ============================================================
     ACTIVE NAV ON SCROLL
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');

  function setActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 160;
      const hgt = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + hgt) {
        navLinks.forEach(l => {
          l.classList.remove('active');
          l.removeAttribute('aria-current');
        });
        const target = document.querySelector(`.nm-link[data-section="${id}"]`);
        if (target) {
          target.classList.add('active');
          target.setAttribute('aria-current', 'page');
        }
      }
    });
  }
  window.addEventListener('scroll', setActiveNav);

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  let animEls = document.querySelectorAll('.anim-reveal, .anim-slide-left, .anim-slide-right');

  function triggerReveal() {
    const wh = window.innerHeight;
    animEls.forEach(el => {
      if (el.getBoundingClientRect().top < wh - 80) {
        el.classList.add('in-view');
      }
    });
  }
  window.addEventListener('scroll', triggerReveal);

  /* ============================================================
     NUMBER COUNTER (hero stats) — supports suffix like "+"
     ============================================================ */
  const counters = document.querySelectorAll('.hrc-num');
  let counted = false;

  function animateCounters() {
    if (counted) return;
    const heroRight = document.querySelector('.hero-right');
    if (!heroRight) return;
    if (heroRight.getBoundingClientRect().top < window.innerHeight - 50) {
      counted = true;
      counters.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const dur = 2000;
        const fps = 60;
        const step = target / (dur / (1000 / fps));
        let cur = 0;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) {
            el.textContent = target.toLocaleString() + suffix;
            clearInterval(t);
          } else {
            el.textContent = Math.floor(cur).toLocaleString() + suffix;
          }
        }, 1000 / fps);
      });
    }
  }
  window.addEventListener('scroll', animateCounters);

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btt.removeAttribute('hidden');
    else btt.setAttribute('hidden', '');
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ============================================================
     FOOTER YEAR
     ============================================================ */
  const yr = document.getElementById('ft-year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS (enhanced)
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     TEAM COMPONENT (Dynamic)
     ============================================================ */
  const teamMembers = [
    {
      name: "Mr. Vilas B. Jamdar",
      role: "Managing Director",
      phone: "",
      img: "assets/team_1.png"
    },
    {
      name: "Mr. Shubham V. Jamdar",
      role: "Managing Director",
      phone: "",
      img: "assets/team_2.png"
    },
    {
      name: "Mr. Abhijeet Jamdar",
      role: "Key Personnel",
      phone: "",
      img: "assets/team_3.png"
    },
    {
      name: "Mr. Sachin Jamdar",
      role: "Key Personnel",
      phone: "",
      img: "assets/team_4.png"
    }
  ];

  const teamGrid = document.getElementById('team-grid-container');
  if (teamGrid) {
    teamGrid.innerHTML = teamMembers.map((member, index) => `
      <div class="team-card anim-reveal ${index > 0 ? 'd' + index : ''}" role="listitem">
        <div class="tc-avatar">
          ${member.img ? `<img src="${member.img}" alt="${member.name}" />` : `<i class="fas fa-user-tie"></i>`}
        </div>
        <h3 class="tc-name">${member.name}</h3>
        <span class="tc-role">${member.role}</span>
        <div class="tc-divider"></div>
        <div class="tc-info">
          ${member.phone ? `
          <a href="tel:${member.phone.replace(/\\s/g, '')}" class="tc-info-row">
            <i class="fas fa-phone-alt"></i>
            <span>${member.phone}</span>
          </a>` : ''}
        </div>
      </div>
    `).join('');
    animEls = document.querySelectorAll('.anim-reveal, .anim-slide-left, .anim-slide-right');
    triggerReveal();
  }

  /* ============================================================
     ABOUT CAROUSEL
     ============================================================ */
  const aboutCarouselImgs = document.querySelectorAll('#about-carousel .ac-img');
  if (aboutCarouselImgs.length > 1) {
    let currentAboutIdx = 0;
    setInterval(() => {
      aboutCarouselImgs[currentAboutIdx].classList.remove('active');
      currentAboutIdx = (currentAboutIdx + 1) % aboutCarouselImgs.length;
      aboutCarouselImgs[currentAboutIdx].classList.add('active');
    }, 4000);
  }

});
