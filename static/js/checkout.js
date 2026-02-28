// Checkout functionality for PedalKernel

(function() {
  'use strict';

  const API_BASE = (window.GSG_CONFIG && window.GSG_CONFIG.apiBase) || 'https://api.gsgmfg.com';

  // Initialize checkout when DOM is ready
  document.addEventListener('DOMContentLoaded', initCheckout);

  function initCheckout() {
    const checkoutMount = document.getElementById('gsg-checkout') || document.querySelector('[data-checkout-mount]');
    if (!checkoutMount) return;

    // Wait for GSG Cart to be ready
    if (typeof GSGCart === 'undefined') {
      console.warn('GSG Cart not loaded, retrying checkout init...');
      setTimeout(initCheckout, 100);
      return;
    }

    const cart = GSGCart.get();
    const items = cart.items || [];

    if (items.length === 0) {
      checkoutMount.innerHTML = `
        <div class="checkout-empty">
          <p>Your cart is empty.</p>
          <p><a href="/products/" class="btn">Browse Products</a></p>
        </div>
      `;
      return;
    }

    // Build checkout form
    renderCheckoutForm(checkoutMount, cart);
  }

  function renderCheckoutForm(mountPoint, cart) {
    const items = cart.items || [];
    let subtotalCents = 0;
    
    items.forEach(item => {
      subtotalCents += (item.price_cents || 0) * (item.qty || 1);
    });

    const subtotal = (subtotalCents / 100).toFixed(2);

    mountPoint.innerHTML = `
      <div class="checkout-form">
        <div class="checkout-summary">
          <h3>Order Summary</h3>
          <div class="checkout-items">
            ${items.map(item => `
              <div class="checkout-item">
                <span>${item.title || item.sku} x ${item.qty}</span>
                <span>$${((item.price_cents * item.qty) / 100).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
          <div class="checkout-subtotal">
            <strong>Subtotal: $${subtotal}</strong>
          </div>
        </div>

        <div class="checkout-fields">
          <h3>Contact Information</h3>
          <label>
            Email
            <input type="email" id="checkout-email" required placeholder="you@example.com">
          </label>

          <h3>Payment Method</h3>
          <div class="payment-options">
            <label class="payment-option">
              <input type="radio" name="payment" value="card" checked>
              <span>Credit Card</span>
            </label>
          </div>

          <div id="card-fields" class="card-fields">
            <label>
              Card Number
              <input type="text" id="card-number" placeholder="4242 4242 4242 4242" maxlength="19">
            </label>
            <div class="card-row">
              <label>
                Expiry
                <input type="text" id="card-expiry" placeholder="MM/YY" maxlength="5">
              </label>
              <label>
                CVC
                <input type="text" id="card-cvc" placeholder="123" maxlength="4">
              </label>
            </div>
          </div>

          <button type="button" class="buy-button" id="checkout-submit" style="width: 100%; margin-top: 1.5rem;">
            Pay $${subtotal}
          </button>

          <p class="checkout-note" style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted);">
            You'll receive your license key via email immediately after payment.
          </p>
        </div>
      </div>
    `;

    // Add submit handler
    const submitBtn = document.getElementById('checkout-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', handleCheckoutSubmit);
    }

    // Format card inputs
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
      cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
      });
    }

    const cardExpiry = document.getElementById('card-expiry');
    if (cardExpiry) {
      cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
      });
    }
  }

  async function handleCheckoutSubmit() {
    const email = document.getElementById('checkout-email')?.value;
    const submitBtn = document.getElementById('checkout-submit');

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!window.GSGCart) {
      alert('Cart not available. Please refresh and try again.');
      return;
    }

    const cart = GSGCart.get();
    const items = cart.items || [];

    if (items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    try {
      // Create order
      const orderData = {
        email: email,
        items: items.map(item => ({
          sku: item.sku,
          qty: item.qty,
          price_cents: item.price_cents
        })),
        storefront: 'pedalkernel'
      };

      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();

      // Clear cart
      GSGCart.clear();

      // Redirect to success page
      window.location.href = `/success/?order=${order.id}`;

    } catch (error) {
      console.error('Checkout error:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Try Again';
      alert('Payment processing failed. Please try again or contact info@pedalkernel.com');
    }
  }
})();