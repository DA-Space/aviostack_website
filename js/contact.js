// First update your form HTML
const form = document.getElementById('contactForm');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const timestamp = new Date().toISOString();

    try {
        // Replace this URL with your Google Apps Script Web App URL
        const response = await fetch('https://script.google.com/macros/s/AKfycbxvTyhVdNXawz-jTCf6SqTi763JzLtdRfvhm_DQoDi7gtkUMW1KoG_h09ueGD361cI/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timestamp,
                name,
                email,
                message
            })
        });

        if (response.ok) {
            showMessage('Message sent successfully!', 'success');
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showMessage('Failed to send message. Please try again.', 'error');
        console.error('Error:', error);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    }
});

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}