document.addEventListener('DOMContentLoaded', function() {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxvTyhVdNXawz-jTCf6SqTi763JzLtdRfvhm_DQoDi7gtkUMW1KoG_h09ueGD361cI/exec'; // We'll get this URL in step 2
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Form validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        if (!name || !email || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const timestamp = new Date().toISOString();
            const formData = {
                timestamp: timestamp,
                name: name,
                email: email,
                message: message
            };

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Since mode is 'no-cors', we won't get a proper response
            // Instead, we'll assume success if no error was thrown
            showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();

        } catch (error) {
            console.error('Submission error:', error);
            showMessage('Failed to send message. Please try again or email us directly.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    });

    function showMessage(message, type) {
        // Remove any existing alerts
        const existingAlert = form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        form.insertBefore(alertDiv, form.firstChild);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});