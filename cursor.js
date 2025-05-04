// Custom cursor effects
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (!cursor || !cursorFollower) return;
  
  document.addEventListener('mousemove', (e) => {
    // Position the cursor elements at the mouse position
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower has a slight delay for smooth effect
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 80);
  });
  
  // Add active class on hover over interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, .product-card, .feature-card, .btn-primary, .btn-secondary, .btn-shop, .btn-view'
  );
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
  });
  
  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
    cursorFollower.classList.add('hidden');
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('hidden');
    cursorFollower.classList.remove('hidden');
  });
});