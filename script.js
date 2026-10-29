/**
 * Purav Dhanki - Digital Marketing & Operations Portfolio
 * Interactive Functionality, Project Filters & Real-Time Search
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileNav();
  initActiveNavSpy();
  initNumberCounters();
  initProjectFilteringAndSearch();
  initModals();
  initRoiCalculator();
  initContactForm();
  setCurrentYear();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('purav_theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  toggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      localStorage.setItem('purav_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      localStorage.setItem('purav_theme', 'light');
    }
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

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
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
      const sectionTop = current.offsetTop - 130;
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
          const duration = 1800;
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
   6. Project Filtering and Live Search
   ========================================================================== */
function initProjectFilteringAndSearch() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('projectSearchInput');
  const projectCards = document.querySelectorAll('.project-card');

  let activeFilter = 'all';
  let searchTerm = '';

  function applyFilters() {
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const textContent = card.textContent.toLowerCase();

      const matchesFilter = (activeFilter === 'all') || (category === activeFilter);
      const matchesSearch = searchTerm === '' || textContent.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  }

  // Filter Button Click Handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* ==========================================================================
   7. Modals Management (Deep Dives & Resume)
   ========================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('.open-modal-btn');
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

  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

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
   8. Campaign ROI & Metric Calculator
   ========================================================================== */
function initRoiCalculator() {
  const budgetInput = document.getElementById('monthlyBudget');
  const budgetRange = document.getElementById('monthlyBudgetRange');
  const budgetDisplay = document.getElementById('budgetDisplay');
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

    if (budgetDisplay) {
      budgetDisplay.textContent = `₹${budget.toLocaleString('en-IN')}`;
    }

    const clicks = Math.round(budget / (cpc > 0 ? cpc : 1));
    const conversions = Math.round(clicks * (convRate / 100));
    const cpa = conversions > 0 ? Math.round(budget / conversions) : 0;
    const revenue = Math.round(conversions * aov);
    const roas = budget > 0 ? (revenue / budget).toFixed(1) : 0;

    calcClicks.textContent = clicks.toLocaleString('en-IN');
    calcConversions.textContent = conversions.toLocaleString('en-IN');
    calcCpa.textContent = `₹${cpa.toLocaleString('en-IN')}`;
    calcRevenue.textContent = `₹${revenue.toLocaleString('en-IN')}`;
    calcRoas.textContent = `${roas}x`;

    const meterPercentage = Math.min(Math.max((roas / 8) * 100, 10), 100);
    roasFill.style.width = `${meterPercentage}%`;

    if (roas >= 4.0) {
      roasFill.style.background = 'linear-gradient(90deg, #10b981, #06b6d4)';
      roasInsight.textContent = 'High-efficiency campaign projection! Positive margin buffer for scaling audience reach across Google Search & Meta Ads.';
    } else if (roas >= 2.5) {
      roasFill.style.background = 'linear-gradient(90deg, #6366f1, #8b5cf6)';
      roasInsight.textContent = 'Healthy return on ad spend. Recommend split-testing ad creatives and landing page CRO to lift conversion rates above 4%.';
    } else if (roas >= 1.0) {
      roasFill.style.background = 'linear-gradient(90deg, #f59e0b, #ea580c)';
      roasInsight.textContent = 'Moderate efficiency. Focus on lowering CPC via tighter negative keyword lists and enhancing hook retention in video assets.';
    } else {
      roasFill.style.background = 'linear-gradient(90deg, #ef4444, #f43f5e)';
      roasInsight.textContent = 'Warning: Sub-breakeven projection. Suggest restructuring targeting, refining value proposition, or increasing Average Order Value.';
    }
  }

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
   9. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const inquiry = document.getElementById('inquiryType').value;
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      statusDiv.innerHTML = '<span style="color: #ef4444;">Please fill in all required fields.</span>';
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry: ${inquiry} from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiry}\n\nMessage:\n${message}\n\n---\nSent via Purav Dhanki Portfolio`
    );

    const mailtoLink = `mailto:puravdhanki@hotmail.com?subject=${subject}&body=${body}`;

    showToast(`Thank you, ${name}! Opening email client to send your message...`);
    statusDiv.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-check"></i> Preparing your message...</span>';

    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
      statusDiv.innerHTML = '';
    }, 1200);
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
   10. Current Year Auto Update
   ========================================================================== */
function setCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
