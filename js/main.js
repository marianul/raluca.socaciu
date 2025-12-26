// ================================
// Main JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initStickyHeader();
    initActiveNavigation();
    initEmailJS();
});

// ================================
// Mobile Menu Toggle
// ================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================================
// Smooth Scroll
// ================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Sticky Header
// ================================
function initStickyHeader() {
    const header = document.getElementById('header');

    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ================================
// Active Navigation on Scroll
// ================================
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Call once on load
}

// ================================
// EmailJS Integration
// ================================
function initEmailJS() {
    // IMPORTANT: Înlocuiește 'YOUR_PUBLIC_KEY' cu cheia ta publică de la EmailJS
    // Poți obține cheia de la: https://dashboard.emailjs.com/admin/account
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) return;

        // Show loading state
        setLoadingState(true);

        // Check if EmailJS is configured
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            // Demo mode - simulate sending
            setTimeout(function() {
                setLoadingState(false);
                showMessage('success', 'Mulțumim pentru mesaj! Te vom contacta în curând. (Demo mode - configurează EmailJS pentru a trimite email-uri reale)');
                form.reset();
            }, 1500);
            return;
        }

        // Send email using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(function() {
                setLoadingState(false);
                showMessage('success', 'Mulțumim pentru mesaj! Te vom contacta în curând.');
                form.reset();
            })
            .catch(function(error) {
                setLoadingState(false);
                showMessage('error', 'A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi telefonic.');
                console.error('EmailJS Error:', error);
            });
    });

    function validateForm() {
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name) {
            showMessage('error', 'Te rugăm să introduci numele.');
            return false;
        }

        if (!email || !isValidEmail(email)) {
            showMessage('error', 'Te rugăm să introduci o adresă de email validă.');
            return false;
        }

        if (!message) {
            showMessage('error', 'Te rugăm să introduci un mesaj.');
            return false;
        }

        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setLoadingState(loading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        if (loading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    function showMessage(type, text) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
}

// ================================
// Utility: Scroll Animation (Optional)
// ================================
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));
}
