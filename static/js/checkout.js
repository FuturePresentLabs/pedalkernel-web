// PedalKernel Pro - Checkout JavaScript
// GSG Ecommerce integration

(function() {
  'use strict';
  
  // Initialize checkout when DOM is ready
  function initCheckout() {
    // Ensure GSG Cart is available
    if (!window.GSGCart) {
      console.warn('GSG Cart not loaded');
      return;
    }
    
    // Add product to cart on checkout page
    const isCheckoutPage = document.querySelector('[data-checkout-mount]');
    if (isCheckoutPage) {
      window.GSGCart.add('PK-PRO-001', 1);
    }
  }
  
  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckout);
  } else {
    initCheckout();
  }
})();
