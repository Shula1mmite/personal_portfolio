document.addEventListener('DOMContentLoaded', () => {
    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Stop the default form submission (which would redirect the page)

            const form = event.target;
            const formData = new FormData(form); // Get all form data (from_name, from_email, message)
            const formUrl = form.action; // Get the Google Apps Script URL from the form's 'action' attribute

            // Get the submit button to show feedback
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent; // Store original text to restore later

            // --- User Feedback: Show loading state ---
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true; // Disable to prevent multiple clicks

            try {
                // Send the form data to the Google Apps Script URL
                const response = await fetch(formUrl, {
                    method: 'POST', // Matches our Apps Script's doPost function
                    body: formData // FormData object automatically handles key-value pairs
                });

                // Parse the JSON response from the Apps Script
                const result = await response.json();

                if (result.result === 'success') {
                    // Success! Alert the user and clear the form
                    alert('Your message has been sent successfully! Thank you for reaching out.');
                    form.reset(); // Clears all the input fields in the form
                } else {
                    // Error from the Apps Script
                    alert('Error sending message: ' + (result.error || 'An unknown error occurred. Please try again later.'));
                }
            } catch (error) {
                // Network error or other issue before reaching Apps Script
                console.error('Submission error:', error);
                alert('An error occurred while trying to send your message. Please check your internet connection and try again.');
            } finally {
                // Always reset the button state after submission (success or failure)
                submitButton.textContent = originalButtonText; // Restore original button text
                submitButton.disabled = false; // Re-enable the button
            }
        });
    }

    // --- Mobile Menu Toggle Logic (MOVED INSIDE DOMContentLoaded) ---
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-list');

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('show');
        });
    }

    // --- Theme Toggle Logic (MOVED INSIDE DOMContentLoaded) ---
    const toggleThemeButton = document.querySelector('.toggle-btn');
    const body = document.body; // body is always available, but good practice to keep here

    // Check saved theme only after DOM is ready
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (toggleThemeButton) { // Ensure button exists before adding listener
        toggleThemeButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });
    }


    // --- FAQ Accordion Logic (MOVED INSIDE DOMContentLoaded) ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = question.nextElementSibling;
            const isActive = faqItem.classList.toggle('active');
            answer.style.display = isActive ? 'block' : 'none';
        });
    });

}); // End of DOMContentLoaded