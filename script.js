/**
 * PORTAFOLIO WEB PERSONAL — MARÍA CASTRO
 * Lógica en Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  
  // TalentAI Modal elements
  const openModalBtn = document.getElementById('open-talentai-modal');
  const closeModalBtn = document.getElementById('close-talentai-modal');
  const modalOverlay = document.getElementById('talentai-modal');

  /* --------------------------------------------------------------------------
     1. STICKY NAVBAR SCROLL EFFECT
     -------------------------------------------------------------------------- */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);

  /* --------------------------------------------------------------------------
     2. MOBILE MENU HAMBURGER TOGGLE
     -------------------------------------------------------------------------- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('mobile-open');
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when clicking any nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. SMOOTH SCROLL WITH HEADER OFFSET
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. ACTIVE SECTION HIGHLIGHT ON SCROLL
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll);

  /* --------------------------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* --------------------------------------------------------------------------
     6. TALENTAI MODAL TOGGLE
     -------------------------------------------------------------------------- */
  if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener('click', () => {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. CONTACT FORM FEEDBACK SIMULATION
     -------------------------------------------------------------------------- */
  if (contactForm && toast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show Toast Notification
      toast.classList.add('show');
      
      // Reset Form
      contactForm.reset();

      // Hide Toast after 4 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    });
  }
});
