// PedalKernel Pro - Main JavaScript
// GSG Ecommerce Cart Integration

(function() {
  'use strict';

  // Initialize GSG Cart when ready
  function initGSGCart() {
    if (typeof GSGCart === 'undefined') {
      console.warn('GSG Cart not loaded yet, retrying...');
      setTimeout(initGSGCart, 100);
      return;
    }

    // Initialize cart with config
    GSGCart.init({
      storefront: 'pedalkernel',
      apiBase: 'https://api.gsgmfg.com',
      persist: true
    });

    console.log('GSG Cart initialized');

    // Dispatch event for other scripts
    document.dispatchEvent(new CustomEvent('gsg-cart:ready'));
  }

  // Wait for DOM and GSG script
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSGCart);
  } else {
    initGSGCart();
  }
})();