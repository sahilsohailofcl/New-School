window.addEventListener('scroll', function() {
    const heroGrid1 = document.querySelector('.hero-grid-1');
    const heroGrid3 = document.querySelector('.hero-grid-3');
  
    if (window.scrollY > 100) {
      heroGrid1.classList.add('swapped');
      heroGrid3.classList.add('swapped');
    } else {
      heroGrid1.classList.remove('swapped');
      heroGrid3.classList.remove('swapped');
    }
  });