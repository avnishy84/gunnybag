/* ============================================================
   PRODUCTS.JS — Fetches products.json and renders product cards
   Works on: index.html, products.html, individual product pages
   ============================================================ */

(function () {
  'use strict';

  const DATA_URL = '/assets/data/products.json';

  // ---- HELPERS ----
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function productDetailUrl(id) {
    return '/products/' + id + '.html';
  }

  function contactUrl(name) {
    return '/contact.html?product=' + encodeURIComponent(name);
  }

  // ---- FETCH ----
  function fetchProducts() {
    return fetch(DATA_URL).then(function (r) {
      if (!r.ok) throw new Error('Failed to load products.json: ' + r.status);
      return r.json();
    });
  }

  // ---- FEATURED PRODUCT CARD (index.html grid) ----
  function renderFeaturedCard(product) {
    const img = product.images && product.images[0] ? '/assets/img/' + product.images[0] : '/assets/img/placeholder-product-1a.svg';
    return `
      <article class="product-card reveal">
        <img
          src="${escHtml(img)}"
          alt="${escHtml(product.name)}"
          class="product-card-img"
          loading="lazy"
          width="400"
          height="300"
        >
        <div class="product-card-body">
          <div class="product-card-model">${escHtml(product.modelNo)}</div>
          <h3 class="product-card-name">${escHtml(product.name)}</h3>
          <p class="product-card-desc">${escHtml(product.shortDesc)}</p>
          <div class="moq-badge" aria-label="Minimum order quantity">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            MOQ: ${escHtml(product.moq)}
          </div>
          <div class="product-card-actions">
            <a href="${productDetailUrl(product.id)}" class="btn btn-secondary btn-sm">View Details</a>
            <a href="${escHtml(contactUrl(product.name))}" class="btn btn-primary btn-sm">Get Best Price</a>
          </div>
        </div>
      </article>
    `;
  }

  // ---- CATALOGUE CARD (products.html) ----
  function renderCatalogueCard(product) {
    const img = product.images && product.images[0] ? '/assets/img/' + product.images[0] : '/assets/img/placeholder-product-1a.svg';
    const specHighlights = Object.entries(product.specs || {})
      .slice(0, 4)
      .map(([k, v]) => `<span class="spec-highlight"><strong>${escHtml(k)}:</strong> ${escHtml(v)}</span>`)
      .join('');

    return `
      <article class="catalogue-card reveal" id="product-${escHtml(product.id)}">
        <img
          src="${escHtml(img)}"
          alt="${escHtml(product.name)}"
          class="catalogue-card-img"
          loading="lazy"
          width="320"
          height="240"
        >
        <div class="catalogue-card-body">
          <div class="catalogue-card-header">
            <div>
              <div class="product-card-model">${escHtml(product.modelNo)}</div>
              <h2 class="catalogue-card-name">${escHtml(product.name)}</h2>
            </div>
            <div class="moq-badge" aria-label="Minimum order quantity">MOQ: ${escHtml(product.moq)}</div>
          </div>
          <p class="catalogue-card-desc">${escHtml(product.shortDesc)}</p>
          <div class="spec-highlights" aria-label="Key specifications">
            ${specHighlights}
          </div>
          <div class="catalogue-card-actions">
            <a href="${productDetailUrl(product.id)}" class="btn btn-secondary">View Details</a>
            <a href="${escHtml(contactUrl(product.name))}" class="btn btn-primary">Get Best Price</a>
          </div>
        </div>
      </article>
    `;
  }

  // ---- PRODUCT DETAIL PAGE POPULATION ----
  function populateProductDetail(product, allProducts) {
    // Title / meta (dynamic update for JS-rendered values)
    const titleEl = document.querySelector('title');
    if (titleEl && !titleEl.dataset.rendered) {
      titleEl.textContent = product.name + ' | Jute Gunny Bags – India';
    }

    // Model number
    document.querySelectorAll('.js-product-model').forEach(el => el.textContent = product.modelNo);

    // Name
    document.querySelectorAll('.js-product-name').forEach(el => el.textContent = product.name);

    // Short desc
    document.querySelectorAll('.js-product-shortdesc').forEach(el => el.textContent = product.shortDesc);

    // MOQ
    document.querySelectorAll('.js-product-moq').forEach(el => el.textContent = product.moq);

    // Long desc
    const longDescEl = document.getElementById('js-long-desc');
    if (longDescEl) {
      longDescEl.innerHTML = product.longDesc
        .split('\n\n')
        .map(p => `<p>${escHtml(p)}</p>`)
        .join('');
    }

    // Gallery
    const galleryMain = document.getElementById('gallery-main');
    const galleryThumbs = document.getElementById('gallery-thumbs');
    if (galleryMain && galleryThumbs && product.images && product.images.length) {
      const firstImg = '/assets/img/' + product.images[0];
      galleryMain.src = firstImg;
      galleryMain.alt = product.name + ' – main view';
      galleryMain.setAttribute('data-lightbox', '');
      galleryMain.setAttribute('data-lightbox-src', firstImg);

      galleryThumbs.innerHTML = product.images.map((imgFile, i) => {
        const src = '/assets/img/' + imgFile;
        return `<img
          src="${escHtml(src)}"
          alt="${escHtml(product.name + ' – view ' + (i + 1))}"
          class="gallery-thumb${i === 0 ? ' active' : ''}"
          data-lightbox
          data-lightbox-src="${escHtml(src)}"
          loading="lazy"
          width="80"
          height="60"
        >`;
      }).join('');
    }

    // Spec table
    const specTableBody = document.getElementById('js-spec-tbody');
    if (specTableBody && product.specs) {
      specTableBody.innerHTML = Object.entries(product.specs)
        .map(([k, v]) => `<tr><th scope="row">${escHtml(k)}</th><td>${escHtml(v)}</td></tr>`)
        .join('');
    }

    // Applications
    const appList = document.getElementById('js-applications');
    if (appList && product.applications) {
      appList.innerHTML = product.applications
        .map(a => `<li class="application-item">${escHtml(a)}</li>`)
        .join('');
    }

    // Customization
    const custList = document.getElementById('js-customization');
    if (custList && product.customization) {
      custList.innerHTML = product.customization
        .map(c => `<li class="customization-item">${escHtml(c)}</li>`)
        .join('');
    }

    // Packaging info
    const packEl = document.getElementById('js-packaging');
    if (packEl && product.specs && product.specs.BalePackaging) {
      packEl.textContent = product.specs.BalePackaging;
    }

    // Enquiry CTA links
    const enquiryUrl = contactUrl(product.name);
    document.querySelectorAll('.js-enquiry-link').forEach(el => {
      el.href = enquiryUrl;
    });

    // WhatsApp product data
    document.body.setAttribute('data-product', product.name);
    document.querySelectorAll('.whatsapp-float').forEach(btn => {
      if (typeof SITE_CONFIG !== 'undefined') {
        const msg = encodeURIComponent(SITE_CONFIG.WHATSAPP_MSG_TEMPLATE.replace('{product}', product.name));
        btn.href = 'https://wa.me/' + SITE_CONFIG.WHATSAPP.replace(/\D/g, '') + '?text=' + msg;
      }
    });

    // Related products
    const relatedContainer = document.getElementById('js-related-products');
    if (relatedContainer && product.relatedIds && allProducts) {
      const relatedProducts = product.relatedIds
        .map(id => allProducts.find(p => p.id === id))
        .filter(Boolean)
        .slice(0, 2);

      if (relatedProducts.length) {
        relatedContainer.innerHTML = `
          <div class="related-products">
            <h2 class="section-title" style="text-align:left;margin-bottom:1.5rem;">Related Products</h2>
            <div class="products-grid" style="grid-template-columns: repeat(auto-fill, minmax(260px,1fr));">
              ${relatedProducts.map(renderFeaturedCard).join('')}
            </div>
          </div>
        `;
        // Re-init scroll reveal for newly added elements
        initRevealForNewElements(relatedContainer.querySelectorAll('.reveal'));
      }
    }
  }

  function initRevealForNewElements(elements) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach(el => observer.observe(el));
  }

  // ---- ROUTER: detect current page and render accordingly ----
  document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;
    const bodyProductId = document.body.getAttribute('data-product-id');

    // Featured products on index.html
    const featuredGrid = document.getElementById('featured-products');
    if (featuredGrid) {
      fetchProducts().then(function (products) {
        featuredGrid.innerHTML = products.map(renderFeaturedCard).join('');
        initRevealForNewElements(featuredGrid.querySelectorAll('.reveal'));
      }).catch(function (err) {
        console.warn('Could not load featured products:', err);
      });
    }

    // Products listing on products.html
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
      fetchProducts().then(function (products) {
        productsGrid.innerHTML = products.map(renderCatalogueCard).join('');
        initRevealForNewElements(productsGrid.querySelectorAll('.reveal'));
      }).catch(function (err) {
        console.warn('Could not load products:', err);
        productsGrid.innerHTML = '<p>Unable to load products. Please refresh the page.</p>';
      });
    }

    // Individual product detail pages
    if (bodyProductId) {
      fetchProducts().then(function (products) {
        const product = products.find(p => p.id === bodyProductId);
        if (product) {
          populateProductDetail(product, products);
        } else {
          console.warn('Product not found:', bodyProductId);
        }
      }).catch(function (err) {
        console.warn('Could not load product data:', err);
      });
    }
  });
})();
