---
title: "Checkout"
description: "Complete your PedalKernel Pro purchase"
layout: checkout
---

<div class="checkout-section">
  <p><a href="/" class="back-link">← Back to PedalKernel Pro</a></p>

  <h2>Checkout</h2>

  <p>You're purchasing <strong>PedalKernel Pro</strong> — $49.00 USD</p>
  
  <p>VST3 plugin license for macOS, Windows, and Linux. 3 activations included.</p>

  <div id="gsg-checkout" data-checkout-mount style="margin: 2rem 0;">
    <p>Loading secure checkout...</p>
  </div>

  <div class="order-summary" style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-alt); border-radius: 4px;">
    <h3>Order Summary</h3>
    <div class="summary-item" style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
      <span>PedalKernel Pro License</span>
      <span>$49.00</span>
    </div>
    <div class="summary-item" style="display: flex; justify-content: space-between; padding: 0.5rem 0; font-weight: bold;">
      <span>Total</span>
      <span>$49.00 USD</span>
    </div>
  </div>

  <div class="guarantee" style="margin-top: 1.5rem; text-align: center; color: var(--text-muted);">
    <p>✓ 30-day money-back guarantee</p>
    <p>✓ Lifetime free updates</p>
    <p>✓ Email delivery of license key</p>
  </div>
</div>

<script>
(function() {
  // Initialize GSG Ecommerce checkout
  function initCheckout() {
    if (typeof GSGCart === 'undefined') {
      console.error('GSG Ecommerce not loaded');
      document.getElementById('gsg-checkout').innerHTML = 
        '<p style="color: #c41e3a;">Checkout temporarily unavailable. Please email <a href="mailto:hello@pedalkernel.com">hello@pedalkernel.com</a> to purchase.</p>';
      return;
    }
    
    // Add product to cart
    GSGCart.add('PK-PRO-001', 1);
    
    // Mount checkout form
    const mountPoint = document.getElementById('gsg-checkout');
    if (mountPoint && GSGCart.mountCheckout) {
      GSGCart.mountCheckout(mountPoint, {
        onSuccess: function(order) {
          window.location.href = '/success/?order=' + order.id;
        },
        onError: function(err) {
          console.error('Checkout error:', err);
          mountPoint.innerHTML = '<p style="color: #c41e3a;">Payment processing error. Please try again or contact hello@pedalkernel.com</p>';
        }
      });
    } else if (mountPoint) {
      // Fallback: redirect to GSG hosted checkout
      mountPoint.innerHTML = '<p>Redirecting to secure checkout...</p>';
      GSGCart.checkout();
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckout);
  } else {
    initCheckout();
  }
})();
</script>