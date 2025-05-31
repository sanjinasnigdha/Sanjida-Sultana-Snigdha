document.addEventListener('DOMContentLoaded', () => {
    // --- Projects Slider (from previous step, if you want it functional) ---
    const projectSliderContainer = document.querySelector('.project-cards-container');
    const projectCards = document.querySelectorAll('.project-card');
    const projectDots = document.querySelectorAll('.project-pagination .dot');
    let currentProjectIndex = 0;
    const projectCardWidth = projectCards[0] ? projectCards[0].offsetWidth + 30 : 0; // Card width + gap

    function updateProjectSlider() {
        if (!projectSliderContainer) return; // Exit if container not found

        projectSliderContainer.style.transform = `translateX(${-currentProjectIndex * projectCardWidth}px)`;

        projectDots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentProjectIndex) {
                dot.classList.add('active');
            }
        });
    }

    projectDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentProjectIndex = index;
            updateProjectSlider();
        });
    });

    // --- Testimonials Slider ---
    const testimonialCardsContainer = document.querySelector('.testimonial-cards-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevArrow = document.querySelector('.testimonial-arrow.prev-arrow');
    const nextArrow = document.querySelector('.testimonial-arrow.next-arrow');

    let currentTestimonialIndex = 0;

    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all cards
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });

        // Show the selected card
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
    }

    // Initialize slider
    if (testimonialCards.length > 0) {
        showTestimonial(currentTestimonialIndex);
    }

    // Navigation for next testimonial
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            currentTestimonialIndex++;
            if (currentTestimonialIndex >= testimonialCards.length) {
                currentTestimonialIndex = 0; // Loop back to the first testimonial
            }
            showTestimonial(currentTestimonialIndex);
        });
    }

    // Navigation for previous testimonial
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            currentTestimonialIndex--;
            if (currentTestimonialIndex < 0) {
                currentTestimonialIndex = testimonialCards.length - 1; // Loop to the last testimonial
            }
            showTestimonial(currentTestimonialIndex);
        });
    }

    // Optional: Auto-slide testimonials
    // let testimonialInterval = setInterval(function() {
    //     nextArrow.click(); // Programmatically click the next arrow
    // }, 7000); // Change testimonial every 7 seconds

    // Optional: Pause auto-slide on hover
    // if (testimonialCardsContainer) {
    //     testimonialCardsContainer.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    //     testimonialCardsContainer.addEventListener('mouseleave', () => {
    //         testimonialInterval = setInterval(function() {
    //             nextArrow.click();
    //         }, 7000);
    //     });
    // }


    // --- Handle resize for both sliders ---
    window.addEventListener('resize', () => {
        // For Project Slider (recalculate slide width)
        if (projectCards.length > 0) {
            const newProjectCardWidth = projectCards[0].offsetWidth + 30; // Recalculate based on current screen size
            if (projectCardWidth !== newProjectCardWidth) { // Only update if width actually changed
                projectCardWidth = newProjectCardWidth; // This would need to be a 'let' variable if declared globally
                updateProjectSlider();
            }
        }
        // Testimonial slider doesn't need complex re-calculation for simple fade/vertical change
    });
});