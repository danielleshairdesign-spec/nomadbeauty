// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Set minimum date for appointment booking (today)
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${year}-${month}-${day}`;
}

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
const confirmationMessage = document.getElementById('confirmationMessage');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            notes: document.getElementById('notes').value
        };
        
        // Log form data (in a real application, this would be sent to a server)
        console.log('Booking Request:', formData);
        
        // Show confirmation message
        bookingForm.style.display = 'none';
        confirmationMessage.style.display = 'block';
        
        // Scroll to confirmation
        confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form and hide confirmation after 5 seconds
        setTimeout(() => {
            bookingForm.reset();
            bookingForm.style.display = 'block';
            confirmationMessage.style.display = 'none';
        }, 5000);
        
        // In a real application, you would send this data to your backend:
        /*
        fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const contactConfirmation = document.getElementById('contactConfirmation');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value
        };
        
        // Log form data (in a real application, this would be sent to a server)
        console.log('Contact Message:', formData);
        
        // Show confirmation message
        contactForm.style.display = 'none';
        contactConfirmation.style.display = 'block';
        
        // Scroll to confirmation
        contactConfirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form and hide confirmation after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            contactConfirmation.style.display = 'none';
        }, 5000);
        
        // In a real application, you would send this data to your backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
    });
}

// Service Selection Helper - Update displayed price
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        if (selectedOption.value) {
            // You can add visual feedback here
            console.log('Selected service:', selectedOption.text);
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe contact cards
document.querySelectorAll('.contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add animation delay for staggered effect
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add real-time validation feedback
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
});

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
}

// Disable weekend dates (optional - if salon is closed on weekends)
// Uncomment if needed:
/*
if (dateInput) {
    dateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getDay();
        
        // 0 = Sunday, 6 = Saturday
        if (dayOfWeek === 0) {
            alert('We are closed on Sundays. Please select another date.');
            this.value = '';
        }
    });
}
*/

// Console welcome message
console.log('%c Welcome to Your Salon Website! ', 'background: #D4A574; color: white; font-size: 16px; padding: 10px;');
console.log('This website was designed with warm tones and a comfortable feel for the perfect salon experience.');
