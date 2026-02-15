// Cart functionality for PedalKernel

(function() {
  'use strict';

  // Initialize cart functionality when GSG is ready
  document.addEventListener('gsg-cart:ready', initCart);
  // Also try immediately in case event already fired
  if (typeof GSGCart !== 'undefined') {
    initCart();
  }

  function initCart() {
    // Setup add to cart buttons
    document.querySelectorAll('[data-add-to-cart]').forEach(button => {
      button.addEventListener('click', handleAddToCart);
    });

    // Setup cart display if on cart page
    const cartMount = document.querySelector('[data-cart-mount]');
    if (cartMount) {
      renderCart(cartMount);
    }

    // Update cart count in header if exists
    updateCartCount();
  }

  function handleAddToCart(e) {
    e.preventDefault();
    const button = e.currentTarget;
    
    const sku = button.dataset.sku;
    const title = button.dataset.title;
    const priceCents = parseInt(button.dataset.priceCents, 10);
    const qty = parseInt(button.dataset.qty || '1', 10);

    if (!sku) {
      console.error('No SKU found for add to cart');
      return;
    }

    // Add to GSG Cart
    if (typeof GSGCart !== 'undefined' && GSGCart.add) {
      GSGCart.add({
        sku: sku,
        title: title || sku,
        price_cents: priceCents || 0,
        qty: qty
      });

      // Visual feedback
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1500);

      // Update cart count
      updateCartCount();

      // Optional: redirect to cart
      // window.location.href = '/cart/';
    } else {
      console.error('GSG Cart not available');
      alert('Cart temporarily unavailable. Please try again later.');
    }
  }

  function renderCart(mountPoint) {
    if (typeof GSGCart === 'undefined' || !GSGCart.get) {
      mountPoint.innerHTML = '<p>Cart loading...</p>';
      return;
    }

    const cart = GSGCart.get();
    const items = cart.items || [];

    if (items.length === 0) {
      mountPoint.innerHTML = `
        <div class="cart-empty">
          <p>Your cart is empty.</p>
          <p><a href="/products/" class="btn">Browse Products</a></p>
        </div>
      `;
      return;
    }

    let html = '<div class="cart-items">';
    let totalCents = 0;

    items.forEach(item => {
      const price = (item.price_cents / 100).toFixed(2);
      const itemTotal = ((item.price_cents * item.qty) / 100).toFixed(2);
      totalCents += item.price_cents * item.qty;

      html += `
        <div class="cart-item" data-sku="${item.sku}">
          <div class="cart-item__info">
            <h4>${item.title || item.sku}</h4>
            <p class="cart-item__sku">SKU: ${item.sku}</p>
          </div>
          <div class="cart-item__qty">
            <button class="qty-btn" data-action="decrease" data-sku="${item.sku}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-action="increase" data-sku="${item.sku}">+</button>
          </div>
          <div class="cart-item__price">
            <span class="item-price">$${itemTotal}</span>
            <button class="remove-btn" data-action="remove" data-sku="${item.sku}">Remove</button>
          </div>
        </div>
      `;
    });

    html += '</div>';

    html += `
      <div class="cart-summary">
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-price">$${(totalCents / 100).toFixed(2)} USD</span>
        </div>
      </div>
    `;

    mountPoint.innerHTML = html;

    // Add event listeners for cart actions
    mountPoint.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', handleCartAction);
    });
  }

  function handleCartAction(e) {
    const btn = e.currentTarget;
    const action = btn.dataset.action;
    const sku = btn.dataset.sku;

    if (!sku || !action) return;

    const cart = GSGCart.get();
    const item = cart.items.find(i => i.sku === sku);

    if (action === 'remove') {
      GSGCart.remove(sku);
    } else if (action === 'increase') {
      GSGCart.update(sku, (item?.qty || 0) + 1);
    } else if (action === 'decrease') {
      const newQty = (item?.qty || 1) - 1;
      if (newQty <= 0) {
        GSGCart.remove(sku);
      } else {
        GSGCart.update(sku, newQty);
      }
    }

    // Re-render cart
    const mountPoint = document.querySelector('[data-cart-mount]');
    if (mountPoint) {
      renderCart(mountPoint);
    }
    updateCartCount();
  }

  function updateCartCount() {
    if (typeof GSGCart === 'undefined' || !GSGCart.get) return;
    
    const cart = GSGCart.get();
    const count = (cart.items || []).reduce((sum, item) => sum + (item.qty || 0), 0);
    
    // Update any cart count badges
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline' : 'none';
    });
  }
})();