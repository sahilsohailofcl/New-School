window.addEventListener('scroll', function() {
    const heroGrid = document.querySelector('.hero-grid-1');
    
    if (window.scrollY > 100) {
      heroGrid.classList.add('swapped');
    } else {
      heroGrid.classList.remove('swapped');
    }
  });
  

  window.addEventListener('scroll', function() {
    const heroGrid = document.querySelector('.hero-grid-3');
    
    if (window.scrollY > 100) {
      heroGrid.classList.add('swapped');
    } else {
      heroGrid.classList.remove('swapped');
    }
  });