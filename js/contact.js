document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const formData = new FormData(form);
            const data = {
                timestamp: new Date().toISOString(),
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Make sure to replace with your new deployment URL
            const response = await fetch('https://script.google.com/macros/s/AKfycby0suLCElaRuvDHZayFco4cg-8qRbFbHWrNrHQUZ9eh8tV2FVfurWVUvpCxwYsM0ArL/exec', {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                redirect: 'follow',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8', // Changed from application/json
                },
                body: JSON.stringify(data)
            });

            // Since we're using no-cors, we need to assume success if no error is thrown
            showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();

        } catch (error) {
            console.error('Submission error:', error);
            showMessage('Error sending message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    });

    function showMessage(message, type) {
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
});