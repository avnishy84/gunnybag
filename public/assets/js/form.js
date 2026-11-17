/* ============================================================
   FORM.JS — Contact form: validation, honeypot, submission,
   query-param pre-fill, mailto fallback
   ============================================================ */

(function () {
  'use strict';

  // ---- PRE-FILL PRODUCT FROM QUERY PARAM ----
  function prefillProduct() {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    if (!product) return;
    const productSelect = document.getElementById('field-product');
    if (!productSelect) return;

    // Find matching option (case-insensitive partial match)
    const opts = Array.from(productSelect.options);
    const match = opts.find(o => o.value && o.value.toLowerCase().includes(product.toLowerCase()));
    if (match) {
      productSelect.value = match.value;
    } else {
      // Add a custom option if no match
      const opt = document.createElement('option');
      opt.value = product;
      opt.textContent = product;
      opt.selected = true;
      productSelect.appendChild(opt);
    }
  }

  // ---- VALIDATION ----
  const VALIDATORS = {
    required: function (val) { return val.trim().length > 0; },
    email: function (val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    },
  };

  function showError(field, msg) {
    field.classList.add('error');
    const errEl = document.getElementById(field.id + '-error');
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
    field.setAttribute('aria-describedby', (field.getAttribute('aria-describedby') || '') + ' ' + field.id + '-error');
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    field.classList.remove('error');
    const errEl = document.getElementById(field.id + '-error');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
    field.removeAttribute('aria-invalid');
  }

  function validateForm(form) {
    let valid = true;

    // Name
    const name = form.querySelector('#field-name');
    if (name) {
      if (!VALIDATORS.required(name.value)) {
        showError(name, 'Name is required.');
        valid = false;
      } else {
        clearError(name);
      }
    }

    // Company
    const company = form.querySelector('#field-company');
    if (company) {
      if (!VALIDATORS.required(company.value)) {
        showError(company, 'Company name is required.');
        valid = false;
      } else {
        clearError(company);
      }
    }

    // Email
    const email = form.querySelector('#field-email');
    if (email) {
      if (!VALIDATORS.required(email.value)) {
        showError(email, 'Email address is required.');
        valid = false;
      } else if (!VALIDATORS.email(email.value)) {
        showError(email, 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError(email);
      }
    }



    return valid;
  }

  // ---- SHOW STATUS MESSAGE ----
  function showStatus(form, type, msg) {
    let statusEl = form.querySelector('.form-status');
    if (!statusEl) {
      statusEl = document.createElement('div');
      statusEl.className = 'form-status';
      statusEl.setAttribute('role', 'alert');
      statusEl.setAttribute('aria-live', 'polite');
      form.appendChild(statusEl);
    }
    statusEl.className = 'form-status ' + type;
    statusEl.textContent = msg;
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ---- BUILD MAILTO FALLBACK ----
  function buildMailto(formData) {
    if (typeof SITE_CONFIG === 'undefined') return 'mailto:info@yourdomain.com';
    const to = SITE_CONFIG.EMAIL;
    const subject = encodeURIComponent('Enquiry from ' + (formData.company || formData.name || 'Website'));
    const lines = [
      'Name: ' + (formData.name || ''),
      'Company: ' + (formData.company || ''),
      'Email: ' + (formData.email || ''),
      'Country: ' + (formData.country || ''),
      'Product: ' + (formData.product || ''),
      'Quantity: ' + (formData.quantity || ''),
      '',
      'Message:',
      formData.message || '',
    ];
    const body = encodeURIComponent(lines.join('\n'));
    return 'mailto:' + to + '?subject=' + subject + '&body=' + body;
  }

  // ---- SUBMIT HANDLER ----
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // Honeypot check
    const hp = form.querySelector('.hp-input');
    if (hp && hp.value.trim()) {
      // Bot detected — silently succeed
      showStatus(form, 'success', 'Thank you! Your enquiry has been sent. We will contact you within 24 hours.');
      form.reset();
      return;
    }

    // Validate
    if (!validateForm(form)) {
      const firstError = form.querySelector('.form-control.error');
      if (firstError) firstError.focus();
      return;
    }

    // Gather data
    const formData = {
      name: (form.querySelector('#field-name') || {}).value || '',
      company: (form.querySelector('#field-company') || {}).value || '',
      email: (form.querySelector('#field-email') || {}).value || '',
      country: (form.querySelector('#field-country') || {}).value || '',
      product: (form.querySelector('#field-product') || {}).value || '',
      quantity: (form.querySelector('#field-quantity') || {}).value || '',
      message: (form.querySelector('#field-message') || {}).value || '',
    };

    const submitBtn = form.querySelector('.form-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    const endpoint = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.FORM_ENDPOINT : '';

    if (endpoint) {
      // POST to configured endpoint
      const payload = Object.assign({}, formData);
      if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.FORM_ACCESS_KEY) {
        payload.access_key = SITE_CONFIG.FORM_ACCESS_KEY;
      }

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.success || data.ok || (data.result && data.result === 'success')) {
            showStatus(form, 'success', 'Thank you! Your enquiry has been sent. We will contact you within 24 hours.');
            form.reset();
          } else {
            throw new Error(data.message || 'Submission failed');
          }
        })
        .catch(function (err) {
          console.error('Form submission error:', err);
          showStatus(form, 'error', 'There was a problem sending your enquiry. Please try emailing us directly.');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Enquiry';
          }
        });
    } else {
      // mailto fallback
      const mailto = buildMailto(formData);
      window.location.href = mailto;
      showStatus(form, 'success', 'Opening your email client… If it does not open, please email us directly at ' + ((typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.EMAIL : 'info@yourdomain.com'));
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Enquiry';
      }
    }
  }

  // ---- REAL-TIME FIELD VALIDATION ----
  function initLiveValidation(form) {
    form.querySelectorAll('.form-control[required]').forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.type === 'email') {
          if (!VALIDATORS.required(field.value)) {
            showError(field, 'Email address is required.');
          } else if (!VALIDATORS.email(field.value)) {
            showError(field, 'Please enter a valid email address.');
          } else {
            clearError(field);
          }
        } else if (field.required && !VALIDATORS.required(field.value)) {
          showError(field, field.getAttribute('data-error') || 'This field is required.');
        } else {
          clearError(field);
        }
      });

      field.addEventListener('input', function () {
        if (field.classList.contains('error') && VALIDATORS.required(field.value)) {
          clearError(field);
        }
      });
    });
  }

  // ---- INIT ----
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('enquiry-form');
    if (!form) return;

    prefillProduct();
    initLiveValidation(form);
    form.addEventListener('submit', handleSubmit);
  });
})();
