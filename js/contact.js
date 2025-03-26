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
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Validate data before sending
            if (!data.name || !data.email || !data.message) {
                throw new Error('Please fill in all required fields');
            }

            const response = await fetch('https://script.google.com/macros/s/AKfycby0suLCElaRuvDHZayFco4cg-8qRbFbHWrNrHQUZ9eh8tV2FVfurWVUvpCxwYsM0ArL/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Show success message and reset form
            showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            
            // Log success for debugging
            console.log('Form submitted successfully');

        } catch (error) {
            console.error('Submission error:', error);
            showMessage(error.message || 'Error sending message. Please try again.', 'error');
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