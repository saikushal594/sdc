document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link or outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });


    // --- Testimonial Slider (Only on Home Page) ---
    const testimonialSlider = document.querySelector('.testimonial-slider');

    if (testimonialSlider) {
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let testimonialInterval;

        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }

        function startSlider() {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        }

        function stopSlider() {
            clearInterval(testimonialInterval);
        }

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        testimonialSlider.addEventListener('mouseenter', stopSlider);
        testimonialSlider.addEventListener('mouseleave', startSlider);

        // Initialize
        showTestimonial(0);
        startSlider();
    }


    // --- Contact Form Submission (Only on Contact Page) ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            const submitButton = contactForm.querySelector('button[type="submit"]');

            // Basic validation
            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate sending data to a server using fetch API
            // In a real application, replace the URL with your backend endpoint
            fetch('https://jsonplaceholder.typicode.com/posts', { // Using a placeholder API for demonstration
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert(`Thank you, ${name}! Your message has been received. We will contact you shortly.`);
                event.target.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again later or call us directly.');
            })
            .finally(() => {
                // Restore button state
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });
    }
});
