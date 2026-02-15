---
title: "Cart"
description: "Your PedalKernel cart"
---

## Shopping Cart

<div id="cart-root" data-cart-mount>
  <p>Loading cart...</p>
</div>

<div class="cart-actions" style="margin-top: 2rem; text-align: center;">
  <a href="/products/" class="btn btn-secondary">← Continue Shopping</a>
  <a href="/checkout/" class="buy-button">Proceed to Checkout →</a>
</div>

<script>
(function() {
  function initCart() {
    if (typeof GSGCart === 'undefined') {
      document.getElementById('cart-root').innerHTML = 
        '<p>Cart unavailable. Please refresh or <a href="mailto:hello@pedalkernel.com">contact us</a>.</p>';
      return;
    }
    
    const mountPoint = document.getElementById('cart-root');
    if (mountPoint && GSGCart.mountCart) {
      GSGCart.mountCart(mountPoint);
    } else {
      // Fallback display
      const cart = GSGCart.get();
      if (!cart || !cart.items || cart.items.length === 0) {
        mountPoint.innerHTML = '<p>Your cart is empty.</p>';
      } else {
        let html = '<ul class="cart-items">';
        cart.items.forEach(item => {
          const price = (item.price_cents / 100).toFixed(2);
          html += `<li>${item.title} - $${price} x ${item.qty}</li>`;
        });
        html += '</ul>';
        html += `<p><strong>Total: $${(cart.total_cents / 100).toFixed(2)}</strong></p>`;
        mountPoint.innerHTML = html;
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
  } else {
    initCart();
  }
})();
</script>