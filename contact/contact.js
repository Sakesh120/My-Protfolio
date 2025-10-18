document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navRight = document.getElementById('nav-right');
    
    if (navToggle && navRight) {
        navToggle.addEventListener('click', () => {
            const isActive = navRight.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(isActive));
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navRight.contains(e.target)) {
            navRight.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters and spaces only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 5,
            message: 'Subject must be at least 5 characters long'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message must be at least 10 characters long'
        }
    };
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const rules = validationRules[fieldName];
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('success', 'error');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
        
        if (rules.required && !value) {
            showError(formGroup, errorElement, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            return false;
        }
        
        if (rules.minLength && value.length < rules.minLength) {
            showError(formGroup, errorElement, rules.message);
            return false;
        }
        
        if (rules.pattern && !rules.pattern.test(value)) {
            showError(formGroup, errorElement, rules.message);
            return false;
        }
        
        if (value) {
            showSuccess(formGroup, errorElement);
            return true;
        }
        
        return true;
    }
    
    function showError(formGroup, errorElement, message) {
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function showSuccess(formGroup, errorElement) {
        formGroup.classList.add('success');
        errorElement.classList.remove('show');
    }
    
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        
        field.addEventListener('focus', () => {
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            formGroup.classList.remove('error');
            errorElement.classList.remove('show');
        });
        
        if (field.name === 'email' || field.name === 'name') {
            field.addEventListener('input', debounce(() => validateField(field), 500));
        }
    });
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            await simulateFormSubmission();
            showSuccessMessage();
            contactForm.reset();
            formFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                formGroup.classList.remove('success', 'error');
            });
        } catch (error) {
            showErrorMessage();
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
        }
    });
    
    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }
    
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="message-content">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                <button class="close-message">Close</button>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => successMessage.classList.add('show'), 100);
        
        successMessage.querySelector('.close-message').addEventListener('click', () => {
            successMessage.classList.remove('show');
            setTimeout(() => successMessage.remove(), 300);
        });
        
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.classList.remove('show');
                setTimeout(() => successMessage.remove(), 300);
            }
        }, 5000);
    }
    
    function showErrorMessage() {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message-popup';
        errorMessage.innerHTML = `
            <div class="message-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>Please try again or contact me directly at sakesh@example.com</p>
                <button class="close-message">Close</button>
            </div>
        `;
        
        document.body.appendChild(errorMessage);
        
        setTimeout(() => errorMessage.classList.add('show'), 100);
        
        errorMessage.querySelector('.close-message').addEventListener('click', () => {
            errorMessage.classList.remove('show');
            setTimeout(() => errorMessage.remove(), 300);
        });
    }
    
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
    
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(168, 85, 247, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .success-message,
        .error-message-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .success-message.show,
        .error-message-popup.show {
            opacity: 1;
        }
        
        .message-content {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            max-width: 400px;
            margin: 0 1rem;
            border: 1px solid var(--accent-purple);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        
        .message-content i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .success-message .message-content i {
            color: var(--success);
        }
        
        .error-message-popup .message-content i {
            color: var(--error);
        }
        
        .message-content h3 {
            color: #fff;
            margin-bottom: 1rem;
        }
        
        .message-content p {
            color: var(--muted);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .close-message {
            background: var(--accent-purple);
            color: #fff;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .close-message:hover {
            background: #7e22ce;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
    
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.contact-card, .faq-item, .social-link').forEach(el => {
        observer.observe(el);
    });
    
    const scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
        .contact-card,
        .faq-item,
        .social-link {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .contact-card.animate-in,
        .faq-item.animate-in,
        .social-link.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(scrollStyle);
});