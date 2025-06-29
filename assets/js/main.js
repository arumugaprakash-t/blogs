// Dark mode toggle functionality
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const lightTheme = document.getElementById('highlight-theme-light');
  const darkTheme = document.getElementById('highlight-theme-dark');
  
  function updateTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Update syntax highlighting theme
    if (lightTheme && darkTheme) {
      if (theme === 'dark') {
        lightTheme.disabled = true;
        darkTheme.disabled = false;
      } else {
        lightTheme.disabled = false;
        darkTheme.disabled = true;
      }
    }
  }
  
  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  updateTheme(initialTheme);
  
  // Theme toggle event listener
  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      updateTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

// Blog post filtering and search functionality
(function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const postsGrid = document.getElementById('posts-grid');
  const noResults = document.getElementById('no-results');
  const postCards = document.querySelectorAll('.post-card');
  
  let currentFilter = 'all';
  let currentSearch = '';
  
  function filterPosts() {
    let visibleCount = 0;
    
    postCards.forEach(card => {
      const category = card.dataset.category;
      const title = card.dataset.title || '';
      const content = card.dataset.content || '';
      
      // Check category filter
      const categoryMatch = currentFilter === 'all' || category === currentFilter;
      
      // Check search filter
      const searchMatch = currentSearch === '' || 
        title.includes(currentSearch) || 
        content.includes(currentSearch) ||
        card.textContent.toLowerCase().includes(currentSearch);
      
      const shouldShow = categoryMatch && searchMatch;
      
      if (shouldShow) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    
    // Show/hide posts grid
    if (postsGrid) {
      postsGrid.style.display = visibleCount === 0 ? 'none' : 'grid';
    }
  }
  
  // Category filter event listeners
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update current filter
      currentFilter = button.dataset.category;
      filterPosts();
    });
  });
  
  // Search input event listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      filterPosts();
    });
    
    // Clear search on escape key
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        currentSearch = '';
        filterPosts();
      }
    });
  }
})();

// Reading time calculation (fallback for posts without read_time)
(function() {
  function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  }
  
  // Update reading time for any elements that need it
  document.querySelectorAll('[data-reading-time]').forEach(element => {
    const content = element.textContent || element.innerText;
    const readingTime = calculateReadingTime(content);
    element.textContent = `${readingTime} min read`;
  });
})();

// Smooth scrolling for anchor links
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
})();

// Lazy loading for images (simple implementation)
(function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
})();

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize search with debouncing
(function() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const originalHandler = searchInput.oninput;
    searchInput.oninput = debounce(originalHandler, 300);
  }
})();

// Add loading states for better UX
(function() {
  // Add loading class to body initially
  document.body.classList.add('loading');
  
  // Remove loading class when page is fully loaded
  window.addEventListener('load', () => {
    document.body.classList.remove('loading');
  });
})();

// Keyboard navigation improvements
(function() {
  // Add focus styles for better accessibility
  const focusableElements = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');
  
  document.addEventListener('keydown', (e) => {
    // Skip to main content on Tab key press from header
    if (e.key === 'Tab' && e.target.closest('.site-header')) {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        e.preventDefault();
        mainContent.focus();
      }
    }
  });
})();