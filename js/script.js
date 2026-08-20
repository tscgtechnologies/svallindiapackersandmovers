/**
 * SVALL INDIA PACKERS & MOVERS - JAVASCRIPT
 * Pure Vanilla JavaScript implementation without frameworks or dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. STICKY HEADER & SCROLL EFFECTS
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header shadow effect
    if (scrollPos > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollPos > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active Navigation Highlight on Scroll (ScrollSpy)
    updateActiveNav();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('visible');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('visible');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* --------------------------------------------------------------------------
     3. ACTIVE NAVIGATION HIGHLIGHT (SCROLLSPY)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], main > div[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function updateActiveNav() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. HERO QUICK ENQUIRY FORM & WHATSAPP GENERATION
     -------------------------------------------------------------------------- */
  const heroForm = document.getElementById('hero-quote-form');
  const quoteNotice = document.getElementById('quote-notice');

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset errors
      clearFormErrors(heroForm);

      // Extract values
      const name = document.getElementById('quote-name').value.trim();
      const phone = document.getElementById('quote-phone').value.trim();
      const from = document.getElementById('quote-from').value.trim();
      const to = document.getElementById('quote-to').value.trim();
      const date = document.getElementById('quote-date').value.trim();
      const type = document.getElementById('quote-type').value;

      let isValid = true;

      // Validation logic
      if (!name) {
        showError('err-name');
        isValid = false;
      }

      if (!phone || !/^[0-9]{10}$/.test(phone)) {
        showError('err-phone');
        isValid = false;
      }

      if (!from) {
        showError('err-from');
        isValid = false;
      }

      if (!to) {
        showError('err-to');
        isValid = false;
      }

      if (!date) {
        showError('err-date');
        isValid = false;
      }

      if (!type) {
        showError('err-type');
        isValid = false;
      }

      if (isValid) {
        // Show success notification notice
        if (quoteNotice) {
          quoteNotice.classList.add('visible');
        }

        // Construct pre-filled WhatsApp message
        const message = `Hello SVALL India Packers & Movers,\n\nI would like to enquire about your moving service.\n\nName: ${name}\nPhone: ${phone}\nMoving From: ${from}\nMoving To: ${to}\nMoving Date: ${date}\nType of Move: ${type}\n\nPlease share the quotation.`;

        const waUrl = `https://wa.me/919014755373?text=${encodeURIComponent(message)}`;

        // Open WhatsApp after a short delay so user sees notice
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 600);
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. CONTACT FORM & WHATSAPP GENERATION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('main-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      clearFormErrors(contactForm);

      const name = document.getElementById('contact-name').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const from = document.getElementById('contact-from').value.trim();
      const to = document.getElementById('contact-to').value.trim();
      const userMessage = document.getElementById('contact-message').value.trim();

      let isValid = true;

      if (!name) {
        showError('err-cname');
        isValid = false;
      }

      if (!phone || !/^[0-9]{10}$/.test(phone)) {
        showError('err-cphone');
        isValid = false;
      }

      if (!from) {
        showError('err-cfrom');
        isValid = false;
      }

      if (!to) {
        showError('err-cto');
        isValid = false;
      }

      if (isValid) {
        let message = `Hello SVALL India Packers & Movers,\n\nI would like to enquire about your moving services.\n\nName: ${name}\nPhone: ${phone}\nMoving From: ${from}\nMoving To: ${to}`;

        if (userMessage) {
          message += `\nDetails: ${userMessage}`;
        }

        message += `\n\nPlease reply with pricing and details.`;

        const waUrl = `https://wa.me/919014755373?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
      }
    });
  }

  function showError(errId) {
    const errEl = document.getElementById(errId);
    if (errEl) {
      errEl.classList.add('visible');
      const inputEl = errEl.previousElementSibling;
      if (inputEl && inputEl.classList.contains('form-control')) {
        inputEl.classList.add('error');
      }
    }
  }

  function clearFormErrors(form) {
    const errorMsgs = form.querySelectorAll('.error-message');
    const inputs = form.querySelectorAll('.form-control');
    errorMsgs.forEach(msg => msg.classList.remove('visible'));
    inputs.forEach(input => input.classList.remove('error'));
  }

  /* --------------------------------------------------------------------------
     6. FAQ ACCORDION
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items for clean accordion behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* --------------------------------------------------------------------------
     7. REAL WORK GALLERY LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  const galleryData = [];

  // Extract gallery data from DOM
  galleryItems.forEach((item, idx) => {
    const img = item.querySelector('.gallery-img');
    const caption = item.querySelector('.gallery-caption');

    galleryData.push({
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : '',
      caption: caption ? caption.textContent : ''
    });

    item.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    if (index < 0 || index >= galleryData.length) return;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const data = galleryData[currentGalleryIndex];
    if (data && lightboxImg) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
      if (lightboxCaption) {
        lightboxCaption.textContent = data.caption || data.alt;
      }
    }
  }

  function prevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  });

});
