const headerMenu = document.getElementById('header-menu');
const headerNav = document.getElementById('header-nav');

headerMenu.addEventListener('click', function() {
  if (window.innerWidth <= 768) {
    headerNav.classList.toggle('active');
  }
});


window.addEventListener('scroll', function() {
  const heroGrid1 = document.querySelector('.hero-grid-1');
  const heroGrid3 = document.querySelector('.hero-grid-3');

  if (window.innerWidth > 768) {
      if (window.scrollY > 100) {
          heroGrid1.classList.add('swapped');
          heroGrid3.classList.add('swapped');
      } else {
          heroGrid1.classList.remove('swapped');
          heroGrid3.classList.remove('swapped');
      }
  } else {
      heroGrid1.classList.remove('swapped');
      heroGrid3.classList.remove('swapped');
  }
});

 