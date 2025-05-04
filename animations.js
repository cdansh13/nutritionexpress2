// Animations JavaScript File

// Initialize animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait for loader to finish
  setTimeout(() => {
    initAnimations();
  }, 2500);
});

function initAnimations() {
  // Parallax effect for hero section
  initParallaxEffect();
  
  // Initialize staggered animations
  initStaggerAnimations();
  
  // Initialize hover effects
  initHoverEffects();
  
  // Initialize scroll animations
  initScrollAnimations();
}

// Parallax effect for hero section
function initParallaxEffect() {
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      // Parallax for hero content
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translate(${mouseX * -15}px, ${mouseY * -15}px)`;
      }
      
      // Parallax for 3D model
      const productModel = document.getElementById('product-model');
      if (productModel) {
        productModel.style.transform = `rotateY(${(mouseX - 0.5) * 20}deg) rotateX(${(mouseY - 0.5) * -10}deg)`;
      }
      
      // Parallax for glow effect
      const glowEffect = document.querySelector('.glow-effect');
      if (glowEffect) {
        glowEffect.style.transform = `translate(calc(-50% + ${mouseX * 40}px), calc(-50% + ${mouseY * 40}px))`;
      }
    });
  }
}

// Staggered animations for elements
function initStaggerAnimations() {
  // Add stagger class to parent elements
  const featureGrid = document.querySelector('.features-grid');
  const productsGrid = document.querySelector('.products-grid');
  const testimonialSlider = document.querySelector('.testimonials-slider');
  
  if (featureGrid) featureGrid.classList.add('stagger');
  if (productsGrid) productsGrid.classList.add('stagger');
  if (testimonialSlider) testimonialSlider.classList.add('stagger');
  
  // Initially hide elements that will be animated
  document.querySelectorAll('.stagger > *').forEach(el => {
    el.style.opacity = '0';
  });
}

// Hover effects
function initHoverEffects() {
  // Product hover effect
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('pulse-animation');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('pulse-animation');
    });
  });
  
  // Button hover effects
  document.querySelectorAll('.btn-primary, .btn-secondary, .btn-shop').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('shimmer-effect');
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('shimmer-effect');
    });
  });
}

// Scroll-triggered animations
function initScrollAnimations() {
  // Get all elements that should be animated on scroll
  const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial, .stat-item');
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Add animation classes when element is visible
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        entry.target.style.opacity = '1';
        
        // Unobserve after animating
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Function to animate elements as they enter viewport
function animateElementsInView() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const elementHeight = element.offsetHeight;
    
    // If element is in viewport
    if (elementPosition < windowHeight - elementHeight / 3) {
      element.classList.add('animated');
    }
  });
}

// Text scramble effect for headings
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#_';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    this.el.innerHTML = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Initialize text scramble effect if heading exists
const heading = document.querySelector('.hero h1');
if (heading) {
  setTimeout(() => {
    const fx = new TextScramble(heading);
    fx.setText(heading.textContent);
  }, 3000);
}

// Animated background particles
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    createParticles();
  }
});

function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const count = 15; // Number of particles
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 5px and 15px
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Random color
    const colors = ['rgba(121, 40, 202, 0.7)', 'rgba(0, 212, 255, 0.7)'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random animation duration between 10s and 25s
    const duration = Math.random() * 15 + 10;
    particle.style.animation = `floatParticle ${duration}s ease-in-out infinite alternate`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Add particle to container
    particlesContainer.appendChild(particle);
  }
}

// Add CSS for particles to the document
const particlesStyle = document.cr