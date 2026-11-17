/* ============================================================
   MAIN.JS — Header/footer injection, nav, lightbox, scroll-reveal,
   sticky header, WhatsApp float, year injection
   ============================================================ */

// ---- HEADER HTML ----
const HEADER_HTML = `
<a class="skip-to-content" href="#main-content">Skip to main content</a>
<header class="site-header" id="main-header" role="banner">
  <div class="container">
    <div class="header-inner">
      <a href="/index.html" class="site-logo" aria-label="Usha Enterprises – Homepage">
        <img src="/assets/img/logo.svg" alt="Usha Enterprises logo" width="168" height="48">
      </a>

      <nav class="site-nav" id="desktop-nav" aria-label="Primary navigation">
        <ul class="nav-list" role="list">
          <li class="nav-item"><a href="/index.html" class="nav-link" data-nav="home">Home</a></li>
          <li class="nav-item"><a href="/about.html" class="nav-link" data-nav="about">About</a></li>
          <li class="nav-item has-dropdown">
            <a href="/products.html" class="nav-link dropdown-toggle" data-nav="products" aria-expanded="false" aria-haspopup="true">Products</a>
            <ul class="dropdown-menu" role="list" aria-label="Products submenu">
              <li><a href="/products/heavy-duty-90-100kg.html" class="dropdown-link">Heavy Duty Sacks (90–100 kg)</a></li>
              <li><a href="/products/coffee-cocoa-beans.html" class="dropdown-link">Coffee &amp; Cocoa Bean Bags</a></li>
              <li><a href="/products/50-60kg-grain-storage.html" class="dropdown-link">Grain Storage Sacks (50–60 kg)</a></li>
              <li><a href="/products/nuts-cashew.html" class="dropdown-link">Nuts &amp; Cashew Sacks</a></li>
            </ul>
          </li>
          <li class="nav-item"><a href="/certificates.html" class="nav-link" data-nav="certificates">Certificates</a></li>
          <li class="nav-item"><a href="/contact.html" class="nav-link" data-nav="contact">Contact</a></li>
        </ul>
      </nav>

      <a href="/contact.html" class="btn btn-primary btn-sm header-cta" aria-label="Get best price enquiry">Get Best Price</a>

      <button class="hamburger" id="hamburger-btn" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation menu">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
    </div>
  </div>

  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">
    <ul class="mobile-nav-list" role="list">
      <li><a href="/index.html" class="mobile-nav-link" data-nav="home">Home</a></li>
      <li><a href="/about.html" class="mobile-nav-link" data-nav="about">About</a></li>
      <li>
        <a href="/products.html" class="mobile-nav-link" data-nav="products">Products</a>
        <ul class="mobile-nav-sub" role="list">
          <li><a href="/products/heavy-duty-90-100kg.html" class="mobile-nav-link">Heavy Duty Sacks (90–100 kg)</a></li>
          <li><a href="/products/coffee-cocoa-beans.html" class="mobile-nav-link">Coffee &amp; Cocoa Bean Bags</a></li>
          <li><a href="/products/50-60kg-grain-storage.html" class="mobile-nav-link">Grain Storage Sacks (50–60 kg)</a></li>
          <li><a href="/products/nuts-cashew.html" class="mobile-nav-link">Nuts &amp; Cashew Sacks</a></li>
        </ul>
      </li>
      <li><a href="/certificates.html" class="mobile-nav-link" data-nav="certificates">Certificates</a></li>
      <li><a href="/contact.html" class="mobile-nav-link" data-nav="contact">Contact</a></li>
    </ul>
    <a href="/contact.html" class="btn btn-primary" style="width:100%;justify-content:center;">Get Best Price</a>
  </nav>
</header>
`;

// ---- FOOTER HTML ----
const FOOTER_HTML = `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h3 class="footer-col-title">Quick Links</h3>
        <nav aria-label="Footer quick links">
          <ul class="footer-links" role="list">
            <li><a href="/index.html" class="footer-link">Home</a></li>
            <li><a href="/about.html" class="footer-link">About Us</a></li>
            <li><a href="/products.html" class="footer-link">Our Products</a></li>
            <li><a href="/certificates.html" class="footer-link">Certifications</a></li>
            <li><a href="/contact.html" class="footer-link">Contact &amp; Enquiry</a></li>
          </ul>
        </nav>
      </div>

      <div class="footer-col">
        <h3 class="footer-col-title">Products</h3>
        <nav aria-label="Footer product links">
          <ul class="footer-links" role="list">
            <li><a href="/products/heavy-duty-90-100kg.html" class="footer-link">Heavy Duty Sacks (90–100 kg)</a></li>
            <li><a href="/products/coffee-cocoa-beans.html" class="footer-link">Coffee &amp; Cocoa Bags</a></li>
            <li><a href="/products/50-60kg-grain-storage.html" class="footer-link">Grain Storage (50–60 kg)</a></li>
            <li><a href="/products/nuts-cashew.html" class="footer-link">Nuts &amp; Cashew Sacks</a></li>
          </ul>
        </nav>
      </div>

      <div class="footer-col">
        <h3 class="footer-col-title">Contact Info</h3>
        <address style="font-style:normal;">
          <div class="footer-contact-item">
            <svg class="footer-contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span data-config="ADDRESS"></span>
          </div>
          <div class="footer-contact-item">
            <svg class="footer-contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <a href="#" data-config="EMAIL"></a>
          </div>
          <div class="footer-contact-item">
            <svg class="footer-contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <a href="#" class="whatsapp-float" data-config="WHATSAPP">WhatsApp</a>
          </div>
          <div class="footer-contact-item">
            <svg class="footer-contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span>GST: <span data-config="GST_NO"></span></span>
          </div>
        </address>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; <span id="footer-year"></span> <span data-config="COMPANY_NAME"></span>. All rights reserved.</span>
      <span>Made with ❤ in India &nbsp;|&nbsp; Manufacturer &amp; Exporter of Jute Bags</span>
    </div>
  </div>
</footer>

<!-- WhatsApp Floating Button -->
<a href="#" class="whatsapp-float-btn whatsapp-float" aria-label="Chat on WhatsApp" data-product="jute gunny bags">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
</a>
`;

// ---- INJECT HEADER & FOOTER ----
document.addEventListener('DOMContentLoaded', function () {
  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.innerHTML = HEADER_HTML;

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Inject year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // After injection, run all init functions
  initActiveNav();
  initHamburger();
  initStickyHeader();
  initScrollReveal();
  initLightbox();

  // Re-run config injection for injected elements
  if (typeof SITE_CONFIG !== 'undefined') {
    document.querySelectorAll('[data-config]').forEach((el) => {
      const key = el.getAttribute('data-config');
      if (SITE_CONFIG[key] !== undefined) {
        if (el.tagName === 'A' && key === 'EMAIL') {
          el.href = 'mailto:' + SITE_CONFIG[key];
          el.textContent = SITE_CONFIG[key];
        } else if (el.tagName === 'A' && key === 'WHATSAPP') {
          el.href = 'https://wa.me/' + SITE_CONFIG.WHATSAPP.replace(/\D/g, '');
          el.textContent = SITE_CONFIG[key];
        } else {
          el.textContent = SITE_CONFIG[key];
        }
      }
    });
    // WhatsApp buttons
    document.querySelectorAll('.whatsapp-float').forEach((btn) => {
      const bodyProduct = document.body.getAttribute('data-product');
      const product = btn.getAttribute('data-product') || bodyProduct || 'jute gunny bags';
      const msg = encodeURIComponent(
        SITE_CONFIG.WHATSAPP_MSG_TEMPLATE.replace('{product}', product)
      );
      btn.href = 'https://wa.me/' + SITE_CONFIG.WHATSAPP.replace(/\D/g, '') + '?text=' + msg;
    });
  }
});

// ---- ACTIVE NAV ----
function initActiveNav() {
  const path = window.location.pathname;
  let page = 'home';
  if (path.includes('/about')) page = 'about';
  else if (path.includes('/products')) page = 'products';
  else if (path.includes('/certificates')) page = 'certificates';
  else if (path.includes('/contact')) page = 'contact';

  document.querySelectorAll('[data-nav]').forEach((el) => {
    if (el.getAttribute('data-nav') === page) {
      el.classList.add('active');
      el.setAttribute('aria-current', 'page');
    }
  });
}

// ---- HAMBURGER MENU ----
function initHamburger() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('open', !expanded);
    mobileNav.setAttribute('aria-hidden', String(expanded));
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      hamburger.focus();
    }
  });
}

// ---- STICKY HEADER ----
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ---- LIGHTBOX ----
function initLightbox() {
  // Create overlay once
  let overlay = document.getElementById('lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML = `
      <button class="lightbox-close" id="lightbox-close" aria-label="Close image viewer">&times;</button>
      <img class="lightbox-img" id="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(overlay);
  }

  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // Bind to .gallery-main and .gallery-thumb images
  document.addEventListener('click', function (e) {
    const target = e.target.closest('[data-lightbox]');
    if (target) {
      e.preventDefault();
      openLightbox(target.getAttribute('data-lightbox-src') || target.src, target.alt);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeLightbox();
  });
}

// ---- GALLERY THUMBNAIL SWITCHING ----
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    const thumb = e.target.closest('.gallery-thumb');
    if (!thumb) return;
    const gallery = thumb.closest('.product-gallery');
    if (!gallery) return;

    const main = gallery.querySelector('.gallery-main');
    if (!main) return;

    gallery.querySelectorAll('.gallery-thumb').forEach((t) => t.classList.remove('active'));
    thumb.classList.add('active');
    main.src = thumb.src;
    main.alt = thumb.alt;
    main.setAttribute('data-lightbox-src', thumb.src);
  });
});

// ---- PRODUCT TABS ----
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    const tabBtn = e.target.closest('.tab-btn');
    if (!tabBtn) return;
    const tabGroup = tabBtn.closest('.tabs');
    if (!tabGroup) return;

    const targetId = tabBtn.getAttribute('data-tab');

    tabGroup.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    tabGroup.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.remove('active');
      panel.setAttribute('hidden', '');
    });

    tabBtn.classList.add('active');
    tabBtn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(targetId);
    if (panel) {
      panel.classList.add('active');
      panel.removeAttribute('hidden');
    }
  });
});
