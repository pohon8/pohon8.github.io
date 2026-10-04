// ==========================================
// POHON8 - Landing Page JavaScript
// ==========================================

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ==========================================
// Mobile Navigation
// ==========================================

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// Active Link on Scroll
// ==========================================

window.addEventListener('scroll', () => {
    let current = '';

    // Get sections
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Smooth Scroll Enhancement
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Contact Form Handling
// ==========================================

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Nama Anda"]').value;
        const email = this.querySelector('input[placeholder="Email Anda"]').value;
        const subject = this.querySelector('input[placeholder="Subjek"]').value;
        const message = this.querySelector('textarea').value;

        // Basic validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            showNotification('Silakan isi semua field yang diperlukan!', 'error');
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showNotification('Silakan masukkan email yang valid!', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;

        // Simulate API call with timeout
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show success message
            showNotification('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.', 'success');
        }, 1500);
    });
}

// ==========================================
// Utility Functions
// ==========================================

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style notification
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInUp 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        max-width: 300px;
    `;

    // Set color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#2ecc71';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else {
        notification.style.backgroundColor = '#3498db';
    }

    // Add to body
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==========================================
// Intersection Observer for Animations
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==========================================
// Scroll Progress Bar (Optional Enhancement)
// ==========================================

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // You can use this for a progress bar if needed
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
});

// ==========================================
// Counter Animation
// ==========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    let hasAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                document.querySelectorAll('.stat h3').forEach(stat => {
                    const text = stat.textContent.replace(/[^0-9]/g, '');
                    if (text) {
                        animateCounter(stat, parseInt(text));
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ==========================================
// Portfolio Filter (if needed in future)
// ==========================================

const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (portfolioFilters.length > 0) {
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            portfolioFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');

            const filterValue = filter.getAttribute('data-filter');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================
// Page Load Animation
// ==========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==========================================
// Dynamic Year in Footer
// ==========================================

const yearElements = document.querySelectorAll('[data-year]');
const currentYear = new Date().getFullYear();
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// ==========================================
// Console Welcome Message
// ==========================================

console.log('%cPohon8 - Solusi Digital Terpercaya', 'font-size: 20px; color: #2ecc71; font-weight: bold;');
console.log('%cTerima kasih telah mengunjungi website kami!', 'font-size: 14px; color: #3498db;');
console.log('Hubungi kami: hello@pohon8.com | Phone: +62 812-3456-7890');

// ==========================================
// Service Initialization Complete
// ==========================================

console.log('%c✓ Pohon8 Landing Page initialized successfully!', 'color: #2ecc71; font-weight: bold;');