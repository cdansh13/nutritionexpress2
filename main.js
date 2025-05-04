// Main Javascript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeScrollEvents();
  initializeHamburgerMenu();
  setupModalEvents();
});

// Navigation scroll effect
function initializeScrollEvents() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Animate elements when they come into view
    animateOnScroll();
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Mobile menu toggle
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
}

// Modal functionality
function setupModalEvents() {
  const modal = document.querySelector('.product-modal');
  const closeBtn = document.querySelector('.modal-close');
  
  if (modal && closeBtn) {
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });
  }
  
  // Handle quantity controls
  const qtyMinus = document.querySelector('.qty-minus');
  const qtyPlus = document.querySelector('.qty-plus');
  const qtyInput = document.querySelector('.quantity input');
  
  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      const currentValue = parseInt(qtyInput.value);
      if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
      }
    });
    
    qtyPlus.addEventListener('click', () => {
      const currentValue = parseInt(qtyInput.value);
      qtyInput.value = currentValue + 1;
    });
  }
}

// Animated counter
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    
    // Skip if already animated
    if (counter.classList.contains('counted')) return;
    
    const updateCounter = () => {
      const increment = target / 50;
      
      if (count < target) {
        count += increment;
        counter.innerText = Math.floor(count);
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target;
        counter.classList.add('counted');
      }
    };
    
    updateCounter();
  });
}

// Animate elements when they enter viewport
function animateOnScroll() {
  const elements = document.querySelectorAll('.feature-card, .product-card, .testimonial, .stat-item');
  const windowHeight = window.innerHeight;
  
  elements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - 100) {
      // Add staggered animation delay
      setTimeout(() => {
        element.classList.add('fade-in-up');
      }, index * 100);
      
      // Animate counters when stats section is visible
      if (element.classList.contains('stat-item')) {
        animateCounters();
      }
    }
  });
}