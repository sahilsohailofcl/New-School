const apiUrl = `${window.location.origin}/api/submit-form`;

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this); // Get form data
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(apiUrl, { // Use dynamic URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const confirmationMessage = document.getElementById('confirmation-message');

        if (response.ok) {
            const result = await response.json();
            confirmationMessage.innerText = result.message;
            confirmationMessage.style.display = 'block';
            this.reset(); // Reset form fields
        } else {
            throw new Error('Error submitting form');
        }
    } catch (error) {
        const confirmationMessage = document.getElementById('confirmation-message');
        confirmationMessage.innerText = 'Error submitting form'; // Show error message
        confirmationMessage.style.display = 'block';
    }
});
