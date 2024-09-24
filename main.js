document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Get form data

    // Convert FormData to a regular object
    const data = Object.fromEntries(formData.entries()); 

    try {
        const response = await fetch('http://newschool-mocha.vercel.app/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(data) // Convert form data to JSON
        });

        const confirmationMessage = document.getElementById('confirmation-message');

        if (response.ok) {
            const result = await response.json(); // Parse the JSON response
            confirmationMessage.innerText = result.message; // Show success message
            confirmationMessage.style.display = 'block';
            this.reset(); // Reset the form fields
        } else {
            throw new Error('Error submitting form');
        }
    } catch (error) {
        const confirmationMessage = document.getElementById('confirmation-message');
        confirmationMessage.innerText = 'Error submitting form'; // Show error message
        confirmationMessage.style.display = 'block';
    }
});
  

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