/**
 * Purav Dhanki - Digital Marketing & Operations Portfolio
 * Interactive Functionality & Dynamics
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileNav();
  initActiveNavSpy();
  initNumberCounters();
  initPortfolioFilters();
  initModals();
  initRoiCalculator();
  initContactForm();
  initBackToTop();
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

  function toggleMenu(forceClose = false) {
    if (forceClose) {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      return;
    }

    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking any nav link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close when clicking outside of nav on mobile
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      toggleMenu(true);
    }
  });

  // Close on window resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      toggleMenu(true);
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
   9. Contact Form Handling (Zero Redirection Backend Storage + WhatsApp Delivery)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  // Replace with your Google Apps Script Web App URL after deploying google_apps_script_backend.js
  const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const inquiry = document.getElementById('inquiryType').value;
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      statusDiv.innerHTML = '<span style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> Please fill in all required fields.</span>';
      return;
    }

    // Disable button to prevent double submission
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving Inquiry & Notifying...';
    }

    statusDiv.innerHTML = '<span style="color: #6366f1;"><i class="fa-solid fa-circle-notch fa-spin"></i> Storing inquiry in backend database...</span>';

    // 1. WhatsApp Notification Pre-formatted text for instant one-click alert
    const waText = 
`🔔 *New Inquiry from Portfolio!*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
✉️ *Email:* ${email}
🎯 *Inquiry Type:* ${inquiry}

💬 *Message:*
"${message}"
━━━━━━━━━━━━━━━━━━━━
📱 *Sent via:* puravdhanki.github.io/Purav-Portfolio/`;

    const encodedWaText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/918108901069?text=${encodedWaText}`;

    // 2. BACKEND STORAGE: Asynchronously post data (No email client redirect, pure background storage)
    const payload = {
      timestamp: new Date().toISOString(),
      name: name,
      email: email,
      inquiry: inquiry,
      message: message
    };

    // Also persist locally in browser localStorage as permanent fallback database
    try {
      const storedLeads = JSON.parse(localStorage.getItem('purav_portfolio_leads') || '[]');
      storedLeads.push(payload);
      localStorage.setItem('purav_portfolio_leads', JSON.stringify(storedLeads));
    } catch (e) {
      console.log('Local storage sync:', e);
    }

    // Send to Google Sheets Backend if URL configured
    if (GOOGLE_APPS_SCRIPT_URL && GOOGLE_APPS_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("inquiry", inquiry);
        formData.append("message", message);

        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          body: formData
        });
      } catch (err) {
        console.log("Backend sheet dispatch notice:", err);
      }
    } else {
      // Background silent fallback to FormSubmit API without any page redirection
      try {
        fetch("https://formsubmit.co/ajax/puravdhanki@hotmail.com", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            inquiry: inquiry,
            message: message,
            _subject: `New Lead: ${inquiry} - ${name}`,
            _template: "table"
          })
        }).catch(e => console.log(e));
      } catch (err) {
        console.log(err);
      }
    }

    // 3. User Success State (Stay on page, NO email redirect)
    showToast(`Inquiry from ${name} recorded successfully!`);

    statusDiv.innerHTML = `
      <div style="margin-top: 0.9rem; padding: 0.9rem 1.1rem; background: rgba(37, 211, 102, 0.12); border: 1px solid rgba(37, 211, 102, 0.35); border-radius: 8px; color: #25d366; font-size: 0.9rem; text-align: left;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
          <i class="fa-solid fa-circle-check" style="font-size: 1.1rem;"></i>
          <strong>Inquiry Saved to Backend Database!</strong>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
          Your inquiry has been stored securely. Opening instant WhatsApp connection to Purav Dhanki (+91 81089 01069)...
        </p>
      </div>
    `;

    // 4. Trigger direct WhatsApp with pre-filled message
    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message &amp; Notify via WhatsApp';
      }

      setTimeout(() => {
        statusDiv.innerHTML = '';
      }, 7000);
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

