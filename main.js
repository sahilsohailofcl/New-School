import './backend/server.js';
import './backend/.env';

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

document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  try {
      const response = await fetch('http://localhost:3000/submit-form', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
          const confirmationMessage = document.getElementById('confirmation-message');
          confirmationMessage.innerText = 'Form submitted successfully!';
          confirmationMessage.style.display = 'block';
          this.reset(); // Optional: Reset the form fields
      } else {
          throw new Error('Error submitting form');
      }
  } catch (error) {
      const confirmationMessage = document.getElementById('confirmation-message');
      confirmationMessage.innerText = 'Error saving data';
      confirmationMessage.style.display = 'block';
  }
});