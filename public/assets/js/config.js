// ============================================================
// SITE CONFIGURATION — edit all values in this one file only
// ============================================================
const SITE_CONFIG = {
  COMPANY_NAME: "USHA ENTERPRISES",
  TAGLINE: "Manufacturer, Exporter & Supplier of Jute Gunny Bags from India",
  EMAIL: "info@yourdomain.com",
  WHATSAPP: "+91XXXXXXXXXX",
  ADDRESS: "Bharat Nagar, New Delhi, India 110025",
  GST_NO: "07EQUPP1416B1ZT",
  DOMAIN: "https://gunnybag-b5be8.web.app",
  // Form endpoint: set to your Formspree or Web3Forms URL
  // e.g. "https://formspree.io/f/XXXXXXXX" or "https://api.web3forms.com/submit"
  FORM_ENDPOINT: "",
  // Web3Forms access key (if using Web3Forms)
  FORM_ACCESS_KEY: "",
  // WhatsApp prefill message template — {product} is replaced at runtime
  WHATSAPP_MSG_TEMPLATE: "Hello, I am interested in {product}. Please share the best price.",
  GOOGLE_MAP_EMBED: "", // paste your Google Maps embed URL here
};

// Inject all text values into DOM elements with data-config="KEY"
(function injectConfig() {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    if (SITE_CONFIG[key] !== undefined) {
      if (el.tagName === "A" && key === "EMAIL") {
        el.href = "mailto:" + SITE_CONFIG[key];
        el.textContent = SITE_CONFIG[key];
      } else if (el.tagName === "A" && key === "WHATSAPP") {
        el.href = "https://wa.me/" + SITE_CONFIG.WHATSAPP.replace(/\D/g, "");
        el.textContent = SITE_CONFIG[key];
      } else {
        el.textContent = SITE_CONFIG[key];
      }
    }
  });
  // Set WhatsApp floating button href
  document.querySelectorAll(".whatsapp-float").forEach((btn) => {
    const product = btn.getAttribute("data-product") || "your jute gunny bags";
    const msg = encodeURIComponent(
      SITE_CONFIG.WHATSAPP_MSG_TEMPLATE.replace("{product}", product)
    );
    btn.href = `https://wa.me/${SITE_CONFIG.WHATSAPP.replace(/\D/g, "")}?text=${msg}`;
  });
})();
