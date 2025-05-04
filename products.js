// Products functionality
document.addEventListener('DOMContentLoaded', () => {
  // Product data
  const products = [
    {
      id: 1,
      name: "Creatine Monohydrate",
      price: "$39.99",
      image: "https://images.pexels.com/photos/3621181/pexels-photo-3621181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Our premium Creatine Monohydrate is scientifically proven to increase strength, power, and muscle mass. 100% pure pharmaceutical grade with no fillers or additives.",
      rating: 5,
      reviews: 124,
      category: "creatine",
      badge: "Bestseller",
      benefits: [
        "Increases strength and power output by up to 15%",
        "Improves recovery between sets and workouts",
        "Enhances muscle volumization and fullness",
        "5g of pure creatine per serving"
      ]
    },
    {
      id: 2,
      name: "Creatine HCL",
      price: "$49.99",
      image: "https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Creatine HCL delivers all the benefits of traditional creatine but with enhanced solubility and absorption. No loading phase required and no bloating or stomach discomfort.",
      rating: 4,
      reviews: 86,
      category: "creatine",
      benefits: [
        "Superior solubility - no clumping or gritty texture",
        "Enhanced absorption with smaller effective dose",
        "No bloating or water retention",
        "No loading phase required"
      ]
    },
    {
      id: 3,
      name: "Performance Blend",
      price: "$59.99",
      image: "https://images.pexels.com/photos/4033918/pexels-photo-4033918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Our advanced Performance Blend combines premium creatine with BCAAs, electrolytes, and beta-alanine for a comprehensive performance formula in one convenient product.",
      rating: 5,
      reviews: 42,
      category: "creatine",
      badge: "New",
      benefits: [
        "5g of Creatine Monohydrate per serving",
        "5g of BCAAs in the optimal 2:1:1 ratio",
        "Electrolyte blend for hydration and performance",
        "1.6g of Beta-Alanine for endurance"
      ]
    },
    {
      id: 4,
      name: "Micronized Creatine",
      price: "$44.99",
      image: "https://images.pexels.com/photos/3621189/pexels-photo-3621189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Ultra-fine micronized creatine for superior mixability and faster absorption. Dissolves instantly with no gritty texture or residue.",
      rating: 4,
      reviews: 67,
      category: "creatine",
      benefits: [
        "20x finer particles than regular creatine",
        "Dissolves instantly in any liquid",
        "No gritty texture or residue",
        "Faster absorption and utilization"
      ]
    },
    {
      id: 5,
      name: "Whey Protein Isolate",
      price: "$54.99",
      image: "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Premium Whey Protein Isolate with 27g of protein per serving and minimal fat and carbs. Unflavored for maximum versatility.",
      rating: 5,
      reviews: 215,
      category: "protein",
      benefits: [
        "27g of protein per serving",
        "Less than 1g of fat and carbs",
        "Fast-absorbing for post-workout recovery",
        "Supports muscle growth and recovery"
      ]
    },
    {
      id: 6,
      name: "Plant Protein",
      price: "$49.99",
      image: "https://images.pexels.com/photos/3621238/pexels-photo-3621238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "100% plant-based protein blend with a complete amino acid profile. 24g of protein per serving with a smooth texture and great taste.",
      rating: 4,
      reviews: 93,
      category: "protein",
      badge: "Vegan",
      benefits: [
        "24g of complete plant protein per serving",
        "Blend of pea, rice, and hemp proteins",
        "Added digestive enzymes for improved absorption",
        "No artificial flavors, colors, or sweeteners"
      ]
    },
    {
      id: 7,
      name: "Pre-Workout Formula",
      price: "$47.99",
      image: "https://images.pexels.com/photos/4114132/pexels-photo-4114132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Comprehensive pre-workout formula with caffeine, creatine, beta-alanine, and citrulline for energy, focus, and performance.",
      rating: 4,
      reviews: 108,
      category: "performance",
      benefits: [
        "200mg of caffeine for energy and focus",
        "3g of Creatine Monohydrate",
        "2g of Beta-Alanine for endurance",
        "6g of Citrulline Malate for pumps and performance"
      ]
    },
    {
      id: 8,
      name: "BCAA Recovery",
      price: "$36.99",
      image: "https://images.pexels.com/photos/4464916/pexels-photo-4464916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Premium BCAA formula with the optimal 2:1:1 ratio of Leucine, Isoleucine, and Valine for muscle recovery and growth.",
      rating: 5,
      reviews: 174,
      category: "performance",
      badge: "Top Rated",
      benefits: [
        "5g of BCAAs per serving in the optimal 2:1:1 ratio",
        "Added electrolytes for hydration",
        "Glutamine for enhanced recovery",
        "Zero calories and zero sugar"
      ]
    }
  ];

  // Initialize the product modal functionality
  initProductModal();
  
  // Initialize product filters if on products page
  if (document.querySelector('.filter-btn')) {
    initProductFilters();
  }
  
  // Set up the quick view buttons
  function initProductModal() {
    const modal = document.querySelector('.product-modal');
    const quickViewButtons = document.querySelectorAll('.btn-view');
    
    if (!modal || quickViewButtons.length === 0) return;
    
    quickViewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Find the product card and get the product ID
        const productCard = btn.closest('.product-card');
        const productId = parseInt(productCard.dataset.productId);
        
        // Find the product data
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        // Populate the modal with product data
        const modalImage = modal.querySelector('.modal-image img');
        const modalTitle = modal.querySelector('.modal-title');
        const modalStars = modal.querySelector('.modal-rating .stars');
        const modalReviews = modal.querySelector('.modal-rating .reviews');
        const modalPrice = modal.querySelector('.modal-price');
        const modalDescription = modal.querySelector('.modal-description');
        const modalBenefits = modal.querySelector('.modal-benefits ul');
        
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalTitle.textContent = product.name;
        
        // Create stars based on rating
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
          starsHTML += i <= product.rating ? '★' : '☆';
        }
        modalStars.innerHTML = starsHTML;
        
        modalReviews.textContent = `(${product.reviews} reviews)`;
        modalPrice.textContent = product.price;
        modalDescription.textContent = product.description;
        
        // Add benefits
        modalBenefits.innerHTML = '';
        product.benefits.forEach(benefit => {
          const li = document.createElement('li');
          li.textContent = benefit;
          modalBenefits.appendChild(li);
        });
        
        // Show the modal
        modal.classList.add('active');
      });
    });
  }
  
  // Filter products on the products page
  function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const sortSelect = document.getElementById('sort');
    
    // Filter functionality
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.dataset.filter;
        
        // Show/hide products based on filter
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    // Sorting functionality
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const value = sortSelect.value;
        const productGrid = document.querySelector('.products-grid');
        const productsArray = Array.from(productCards);
        
        // Sort products
        productsArray.sort((a, b) => {
          if (value === 'price-low') {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceA - priceB;
          } else if (value === 'price-high') {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceB - priceA;
          } else {
            // Default to featured (original order) or newest
            return 0;
          }
        });
        
        // Re-append sorted products
        productsArray.forEach(card => {
          productGrid.appendChild(card);
        });
      });
    }
  }
});