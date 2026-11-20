/**
 * Purav Dhanki - Digital Marketing & Operations Portfolio
 * Interactive Functionality & Dynamics
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileNav();
  const printBtn = document.getElementById('printResumeBtn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());
  initActiveNavSpy();
  initNumberCounters();
  initPortfolioFilters();
  initModals();
  initRoiCalculator();
  initContactForm();
  initBackToTop();
  setCurrentYear();
  initScrollReveal();
});

/* ==========================================================================
   Scroll Reveal: content fades up gently as it enters the viewport.
   Skipped for reduced-motion users and browsers without IntersectionObserver.
   ========================================================================== */
function initScrollReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const groups = [
    '.section-header',
    '.about-grid > *',
    '.skills-grid-v2 > *',
    '.toolkit-head',
    '.logo-grid > *',
    '.skills-grounding-strip',
    '.project-card-v2',
    '.timeline-item',
    '.cert-card',
    '.education-banner',
    '.calculator-section .container > *:not(.section-header)',
    '.contact-section .container > *:not(.section-header)'
  ];

  const items = [];
  groups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (el.classList.contains('reveal')) return;
      el.classList.add('reveal');
      // Small stagger between siblings, capped so long lists don't drag
      el.style.setProperty('--reveal-delay', Math.min(i, 6) * 60 + 'ms');
      items.push(el);
    });
  });

  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   1. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  // Light is the default; the icon shows the theme you'll switch to.
  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);
    toggleBtn.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  };

  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('purav_theme_v2') || 'light'; } catch (e) {}
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const next = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('purav_theme_v2', next); } catch (e) {}
  });
}

/* ==========================================================================
   2. Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (!mobileToggle || !navMenu) return;

  // Must match the CSS breakpoint where the hamburger menu takes over
  const MOBILE_NAV_MAX = 1100;

  function setMenu(open) {
    mobileToggle.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    document.body.classList.toggle('nav-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }

  const isOpen = () => navMenu.classList.contains('active');

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu(!isOpen());
  });

  // Close when any link inside the menu is used (nav links, CTAs, socials)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Close when clicking outside of the menu
  document.addEventListener('click', (e) => {
    if (isOpen() && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      setMenu(false);
    }
  });

  // Close with Escape and return focus to the toggle
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setMenu(false);
      mobileToggle.focus();
    }
  });

  // Close when resizing up to the desktop layout
  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_NAV_MAX && isOpen()) {
      setMenu(false);
    }
  });
}

/* ==========================================================================
   4. Active Navigation Link Spy
   ========================================================================== */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   5. Animated Number Counters
   ========================================================================== */
function initNumberCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toLocaleString('en-IN');
              clearInterval(timer);
            } else {
              counter.textContent = Math.ceil(current).toLocaleString('en-IN');
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-banner');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   6. Portfolio Filters
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-v2, .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Modals Management (Case Studies & Resume)
   ========================================================================== */
function initModals() {
  // Open modal buttons
  const openButtons = document.querySelectorAll('[data-modal]');
  const resumeBtn = document.getElementById('viewResumeModalBtn');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      openModal('modal-resume');
    });
  }

  // Close buttons inside modals
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close when clicking modal backdrop
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

/* ==========================================================================
   8. Interactive Campaign ROI Calculator
   ========================================================================== */
function initRoiCalculator() {
  const budgetInput = document.getElementById('monthlyBudget');
  const budgetRange = document.getElementById('monthlyBudgetRange');
  const cpcInput = document.getElementById('avgCpc');
  const convRateInput = document.getElementById('convRate');
  const aovInput = document.getElementById('avgOrderValue');

  const calcClicks = document.getElementById('calcClicks');
  const calcConversions = document.getElementById('calcConversions');
  const calcCpa = document.getElementById('calcCpa');
  const calcRevenue = document.getElementById('calcRevenue');
  const calcRoas = document.getElementById('calcRoas');
  const roasFill = document.getElementById('roasFill');
  const roasInsight = document.getElementById('roasInsight');

  if (!budgetInput || !cpcInput || !convRateInput || !aovInput) return;

  function updateCalculations() {
    const budget = parseFloat(budgetInput.value) || 0;
    const cpc = parseFloat(cpcInput.value) || 1;
    const convRate = parseFloat(convRateInput.value) || 0.1;
    const aov = parseFloat(aovInput.value) || 0;

    const clicks = Math.round(budget / (cpc > 0 ? cpc : 1));
    const conversions = Math.round(clicks * (convRate / 100));
    const cpa = conversions > 0 ? Math.round(budget / conversions) : 0;
    const revenue = Math.round(conversions * aov);
    const roas = budget > 0 ? (revenue / budget).toFixed(1) : 0;

    // Update UI numbers
    calcClicks.textContent = clicks.toLocaleString('en-IN');
    calcConversions.textContent = conversions.toLocaleString('en-IN');
    calcCpa.textContent = `₹${cpa.toLocaleString('en-IN')}`;
    calcRevenue.textContent = `₹${revenue.toLocaleString('en-IN')}`;
    calcRoas.textContent = `${roas}x`;

    // Update ROAS meter width (capped at 10x for 100%)
    const meterPercentage = Math.min(Math.max((roas / 8) * 100, 10), 100);
    roasFill.style.width = `${meterPercentage}%`;

    // Dynamic insight commentary
    if (roas >= 4.0) {
      roasFill.style.background = 'linear-gradient(90deg, #10b981, #06b6d4)';
      roasInsight.textContent = 'Exceptional ROAS projection! High margin headroom for aggressive horizontal scaling across Meta and Google Search.';
    } else if (roas >= 2.5) {
      roasFill.style.background = 'linear-gradient(90deg, #6366f1, #8b5cf6)';
      roasInsight.textContent = 'Healthy return on ad spend. Recommend split-testing ad creatives and on-page CRO to boost conversion rates above 4%.';
    } else if (roas >= 1.0) {
      roasFill.style.background = 'linear-gradient(90deg, #f59e0b, #ea580c)';
      roasInsight.textContent = 'Moderate efficiency. Focus on lowering CPC via tighter negative keyword lists and enhancing hook retention in video assets.';
    } else {
      roasFill.style.background = 'linear-gradient(90deg, #ef4444, #f43f5e)';
      roasInsight.textContent = 'Warning: Sub-breakeven projection. Suggest restructuring targeting, refining value proposition, or increasing Average Order Value.';
    }
  }

  // Budget slider and input sync
  budgetInput.addEventListener('input', () => {
    budgetRange.value = budgetInput.value;
    updateCalculations();
  });

  budgetRange.addEventListener('input', () => {
    budgetInput.value = budgetRange.value;
    updateCalculations();
  });

  cpcInput.addEventListener('input', updateCalculations);
  convRateInput.addEventListener('input', updateCalculations);
  aovInput.addEventListener('input', updateCalculations);

  updateCalculations();
}

/* ==========================================================================
   9. Contact Form Handling (email delivery via FormSubmit, no WhatsApp)
   ========================================================================== */
const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/puravdhanki@hotmail.com';
const CONTACT_EMAIL = 'puravdhanki@hotmail.com';
const SUBMIT_LABEL = '<i class="fa-solid fa-paper-plane"></i> Send Message';

function setFormStatus(statusDiv, type, text, linkHref, linkText) {
  statusDiv.textContent = '';
  statusDiv.className = `form-status form-status--${type}`;
  const icon = document.createElement('i');
  icon.className = type === 'success'
    ? 'fa-solid fa-circle-check'
    : type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-spinner fa-spin';
  icon.setAttribute('aria-hidden', 'true');
  const msg = document.createElement('span');
  msg.textContent = ` ${text}`;
  statusDiv.append(icon, msg);
  if (linkHref) {
    const a = document.createElement('a');
    a.href = linkHref;
    a.textContent = linkText;
    statusDiv.append(' ', a);
  }
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  if (!form || !statusDiv) return;
  statusDiv.setAttribute('role', 'status');
  statusDiv.setAttribute('aria-live', 'polite');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const inquiry = document.getElementById('inquiryType').value;
    const message = document.getElementById('senderMessage').value.trim();
    const honey = form.querySelector('[name="_honey"]');

    if (!name || !email || !message) {
      setFormStatus(statusDiv, 'error', 'Please fill in all required fields.');
      return;
    }
    // Bots fill hidden fields; quietly pretend success.
    if (honey && honey.value) {
      form.reset();
      setFormStatus(statusDiv, 'success', 'Thanks! Your message has been sent.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    }
    setFormStatus(statusDiv, 'pending', 'Sending your message...');

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          inquiry,
          message,
          _replyto: email,
          _subject: `Portfolio inquiry: ${inquiry} from ${name}`,
          _template: 'table'
        })
      });
      const data = await res.json().catch(() => ({}));
      const ok = res.ok && (data.success === true || data.success === 'true');
      if (!ok) {
        console.error('Contact form rejected by FormSubmit:', res.status, data);
        // First use: FormSubmit emails an "Activate Form" link instead of delivering.
        if (/activat/i.test(data.message || '')) {
          setFormStatus(statusDiv, 'error', 'This form is still being set up, so your message was not delivered yet.', `mailto:${CONTACT_EMAIL}`, 'Email Purav directly');
          return;
        }
        throw new Error(data.message || `HTTP ${res.status}`);
      }

      form.reset();
      setFormStatus(statusDiv, 'success', `Thanks, ${name}! Your message has been sent. Purav will reply to ${email} soon.`);
      showToast('Message sent successfully');
    } catch (err) {
      console.error('Contact form failed:', err);
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Portfolio inquiry: ${inquiry}`)}&body=${encodeURIComponent(`${message}\n\n${name}\n${email}`)}`;
      setFormStatus(statusDiv, 'error', "Sorry, the message couldn't be sent right now.", mailto, 'Email Purav directly instead');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = SUBMIT_LABEL;
      }
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   10. Back to Top Smooth Scroll
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   11. Current Year Auto Update
   ========================================================================== */
function setCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}





