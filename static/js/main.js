// PedalKernel Pro - Main JavaScript
// Rhino-inspired interactions

document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSG Cart
  if (window.GSGCart) {
    window.GSGCart.init({
      apiBase: 'https://api.gsgmfg.com',
      storefront: 'pedalkernel'
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Animate waveform bars
  const waveBars = document.querySelectorAll('.wave-bar');
  if (waveBars.length) {
    setInterval(() => {
      waveBars.forEach(bar => {
        const height = 30 + Math.random() * 70;
        bar.style.height = height + '%';
      });
    }, 100);
  }
});
