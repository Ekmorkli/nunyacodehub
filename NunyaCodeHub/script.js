// NunyaCode Hub - Interactive JavaScript
// Author: NunyaCode Hub Team
// Description: Handles all interactive functionality for the website

(function() {
    'use strict';

    // Global variables
    let currentTestimonialIndex = 0;
    let testimonialInterval;
    let countdownInterval;

    // DOM Content Loaded Event
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });

    // Initialize all functionality
    function initializeApp() {
        initNavigation();
        initCountdownTimer();
        initTestimonialsCarousel();
        initScrollAnimations();
        initCourseFiltering();
        initAIRecommendation();
        initFormHandling();
        initFAQAccordion();
        initNewsletterSignup();
        initSmoothScrolling();
        initTechNodesAnimation();
    }

    // Navigation functionality
    function initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.getElementById('navbar');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }

        // Navbar scroll effect
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(26, 31, 46, 0.98)';
                } else {
                    navbar.style.background = 'rgba(26, 31, 46, 0.95)';
                }
            });
        }

        // Active nav link highlighting
        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink(); // Initial call
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Countdown Timer functionality
    function initCountdownTimer() {
        const countdownTimer = document.getElementById('countdown-timer');
        if (!countdownTimer) return;

        const targetDate = new Date('July 7, 2025 00:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownTimer.innerHTML = '<div class="time-unit"><span class="time-value">00</span><span class="time-label">Launched!</span></div>';
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        updateCountdown(); // Initial call
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Testimonials Carousel functionality
    function initTestimonialsCarousel() {
        const carousel = document.getElementById('testimonials-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');

        if (slides.length === 0) return;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });

            currentTestimonialIndex = index;
        }

        function nextSlide() {
            const nextIndex = (currentTestimonialIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentTestimonialIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto-play carousel
        function startAutoPlay() {
            testimonialInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            clearInterval(testimonialInterval);
        }

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Start auto-play
        startAutoPlay();
    }

    // Scroll-triggered animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        // Add staggered animation for multiple elements
                        const siblings = Array.from(entry.target.parentNode.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                });
            }, observerOptions);

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            animatedElements.forEach(element => {
                element.classList.add('animate');
            });
        }
    }

    // Course filtering functionality
    function initCourseFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-detailed');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter courses
                courseCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                    } else {
                        card.classList.add('hidden');
                        setTimeout(() => {
                            if (card.classList.contains('hidden')) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }

    // AI Course Recommendation functionality
    function initAIRecommendation() {
        const quizOptions = document.querySelectorAll('.quiz-option');
        const quizResult = document.getElementById('quiz-result');
        const recommendationText = document.getElementById('recommendation-text');
        const recommendationLink = document.getElementById('recommendation-link');

        const recommendations = {
            'data-analytics': {
                text: 'Based on your interest in working with numbers and insights, we recommend our Data Analytics Mastery course. You\'ll learn to transform raw data into actionable business intelligence.',
                link: '#data-analytics'
            },
            'web-design': {
                text: 'Your creative interests align perfectly with our Modern Web Design course. You\'ll master the art of creating beautiful, responsive websites that engage users.',
                link: '#web-design'
            },
            'cybersecurity': {
                text: 'Your interest in protecting digital systems makes you a great candidate for our upcoming Cybersecurity Fundamentals course. Stay tuned for the launch!',
                link: '#cybersecurity'
            }
        };

        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                const course = this.getAttribute('data-course');
                const recommendation = recommendations[course];

                if (recommendation && recommendationText && recommendationLink && quizResult) {
                    recommendationText.textContent = recommendation.text;
                    recommendationLink.setAttribute('href', recommendation.link);
                    quizResult.style.display = 'block';
                    quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }

    // Form handling functionality
    function initFormHandling() {
        const enrollmentForm = document.getElementById('enrollment-form');
        const enrollmentSuccess = document.getElementById('enrollment-success');

        if (enrollmentForm) {
            enrollmentForm.addEventListener('submit', handleEnrollmentSubmission);
        }

        // URL parameter handling for pre-selected courses
        const urlParams = new URLSearchParams(window.location.search);
        const courseParam = urlParams.get('course');
        if (courseParam) {
            const courseSelect = document.getElementById('course');
            if (courseSelect) {
                courseSelect.value = courseParam;
            }
        }
    }

    // Handle enrollment form submission
    function handleEnrollmentSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = document.getElementById('submit-btn');
        const enrollmentSuccess = document.getElementById('enrollment-success');

        // Clear previous errors
        clearFormErrors();

        // Validate form
        if (!validateEnrollmentForm(formData)) {
            return;
        }

        // Show loading state
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'Processing...';
        }

        // Submit enrollment data to server with automatic email sending
        fetch('/api/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                course: formData.get('course'),
                experience: formData.get('experience'),
                motivation: formData.get('motivation'),
                newsletter: formData.get('newsletter'),
                terms: formData.get('terms')
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Hide form and show success message
                form.style.display = 'none';
                if (enrollmentSuccess) {
                    enrollmentSuccess.style.display = 'block';
                    enrollmentSuccess.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update success message with email status
                    updateSuccessMessage(enrollmentSuccess, data);
                }
                
                console.log('✅ Enrollment successful:', data.studentName);
                console.log('📧 Email sent:', data.emailSent);
            } else {
                throw new Error(data.error || 'Enrollment failed');
            }
        })
        .catch(error => {
            console.error('❌ Enrollment error:', error);
            
            // Show error message to user
            const errorDiv = document.createElement('div');
            errorDiv.className = 'enrollment-error';
            errorDiv.style.cssText = `
                background: #fee;
                color: #c33;
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
                border: 1px solid #fcc;
            `;
            errorDiv.innerHTML = `
                <strong>Enrollment Error:</strong> ${error.message}<br>
                <small>Please try again or contact us at info@nunyacodehub.com</small>
            `;
            
            form.appendChild(errorDiv);
            
            // Scroll to error
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .finally(() => {
            // Reset loading state
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = 'Enroll Now';
            }
        });
    }

    // Update success message with email status
    function updateSuccessMessage(successContainer, responseData) {
        const emailStatusDiv = document.createElement('div');
        emailStatusDiv.className = 'email-status';
        emailStatusDiv.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        `;

        if (responseData.emailSent) {
            emailStatusDiv.style.background = '#d4edda';
            emailStatusDiv.style.color = '#155724';
            emailStatusDiv.style.border = '1px solid #c3e6cb';
            emailStatusDiv.innerHTML = `
                <i class="fas fa-check-circle" style="margin-right: 8px; color: #28a745;"></i>
                <strong>Welcome Email Sent!</strong><br>
                Check your email for a personalized welcome message with your course details, program outline, and next steps.
            `;
        } else {
            emailStatusDiv.style.background = '#fff3cd';
            emailStatusDiv.style.color = '#856404';
            emailStatusDiv.style.border = '1px solid #ffeaa7';
            emailStatusDiv.innerHTML = `
                <i class="fas fa-clock" style="margin-right: 8px; color: #ffc107;"></i>
                <strong>Email Sending...</strong><br>
                Your welcome email will be delivered shortly. Please check your inbox in a few minutes.
            `;
        }

        successContainer.appendChild(emailStatusDiv);
    }

    // Validate enrollment form
    function validateEnrollmentForm(formData) {
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'course'];

        requiredFields.forEach(field => {
            const value = formData.get(field);
            if (!value || value.trim() === '') {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Email validation
        const email = formData.get('email');
        if (email && !isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation
        const phone = formData.get('phone');
        if (phone && !isValidPhone(phone)) {
            showFieldError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        // Terms acceptance
        const terms = formData.get('terms');
        if (!terms) {
            showFieldError('terms', 'You must accept the terms and conditions');
            isValid = false;
        }

        return isValid;
    }

    // Clear form errors
    function clearFormErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.textContent = '');
    }

    // Show field error
    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\s\-\(\)]*[0-9][\s\-\(\)0-9]*$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    // Email Template System for dynamic welcome emails
    const emailTemplateSystem = {
        courseData: {
            'data-analytics': {
                name: 'Data Analytics Mastery',
                schedule: 'Sundays, 10:00 AM - 1:00 PM GMT',
                duration: '12 weeks',
                outline: [
                    { weeks: 'Week 1-3', topic: 'Excel Fundamentals', description: 'Master data manipulation and basic analysis in Excel' },
                    { weeks: 'Week 4-6', topic: 'SQL Database Management', description: 'Learn to query and manage databases effectively' },
                    { weeks: 'Week 7-9', topic: 'Python for Data Analysis', description: 'Dive into Python programming for data science' },
                    { weeks: 'Week 10-12', topic: 'Power BI & Capstone Project', description: 'Create stunning dashboards and complete your portfolio project' }
                ]
            },
            'web-design': {
                name: 'Modern Web Design',
                schedule: 'Saturdays, 10:00 AM - 1:00 PM GMT',
                duration: '16 weeks',
                outline: [
                    { weeks: 'Week 1-4', topic: 'HTML/CSS Foundations', description: 'Build solid foundations in web markup and styling' },
                    { weeks: 'Week 5-8', topic: 'JavaScript Interactivity', description: 'Add dynamic behavior to your websites' },
                    { weeks: 'Week 9-12', topic: 'Figma Design Systems', description: 'Master professional design tools and workflows' },
                    { weeks: 'Week 13-16', topic: 'Responsive Design & Capstone', description: 'Create mobile-friendly sites and showcase your skills' }
                ]
            }
        },
        
        pricingInfo: {
            total: '300 GHS',
            monthly: '100 GHS/month',
            monthlyPeriod: '3 months',
            justification: 'This investment supports our world-class instructors, cutting-edge learning platforms, and comprehensive career support services that make NunyaCode Hub the premier tech training destination in Africa.'
        },

        generateWelcomeEmailContent: function(studentData) {
            const { firstName, lastName, email, course } = studentData;
            const fullName = `${firstName} ${lastName}`;
            const courseInfo = this.courseData[course];
            
            if (!courseInfo) {
                console.error(`Course "${course}" not found in template system`);
                return null;
            }

            const outlineHTML = courseInfo.outline.map(item => `
                <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 3px solid #00ffcc;">
                    <div style="font-weight: 600; color: #2e4374;">${item.weeks}</div>
                    <div style="font-weight: 500; color: #1a1f2e; margin: 5px 0;">${item.topic}</div>
                    <div style="color: #6c7a89; font-size: 14px;">${item.description}</div>
                </div>
            `).join('');

            const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to NunyaCode Hub - Your Tech Journey Begins!</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1f2e; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
    <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #00ffcc;">
            <div style="font-family: 'Orbitron', monospace; font-size: 24px; font-weight: 900; color: #00ffcc; margin-bottom: 10px;">NunyaCode Hub</div>
            <div style="color: #6c7a89; font-style: italic;">Where Knowledge Meets Code</div>
        </div>

        <div style="font-size: 18px; color: #2e4374; margin-bottom: 20px;">
            Hello ${fullName}! 🎉
        </div>

        <p>We are absolutely thrilled to welcome you to the NunyaCode Hub family! Your journey into the exciting world of technology starts here, and we couldn't be more excited to be part of your transformation.</p>

        <div style="background: linear-gradient(135deg, #2e4374, #4a2c6f); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">${courseInfo.name}</div>
            <div>You've chosen an incredible path that will equip you with industry-relevant skills and open doors to amazing opportunities in Africa's growing tech ecosystem.</div>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">📋 Application Confirmation</div>
            <p>We have successfully received your application for the <strong>${courseInfo.name}</strong> program. Our admissions team will review your application within <strong>5-7 business days</strong> and get back to you with next steps.</p>
            
            <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0; border: 1px solid #ffeaa7;">
                <strong>🚀 Program Launch Date: July 7, 2025</strong><br>
                Mark your calendar! This is when your transformation begins.
            </div>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">🎯 Your ${courseInfo.name} Journey</div>
            <p>Here's what you can expect over the next ${courseInfo.duration}:</p>
            ${outlineHTML}
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">📅 Schedule & Learning Platforms</div>
            <div style="background: #e8f4f8; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <strong>Live Sessions:</strong> ${courseInfo.schedule}<br>
                <strong>Duration:</strong> ${courseInfo.duration}<br>
                <strong>Platforms:</strong> Zoom (live classes) & Google Classroom (resources & assignments)
            </div>
            <p>All sessions are carefully designed to fit around your schedule while ensuring maximum learning impact. You'll have access to recorded sessions, so don't worry if you occasionally miss a live class!</p>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">💰 Investment in Your Future</div>
            <div style="background: linear-gradient(135deg, #00ffcc, #00d4aa); color: #1a1f2e; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px;">Total Program Cost: ${this.pricingInfo.total}</div>
                <div style="text-align: center; margin-bottom: 10px;">💡 Flexible Payment: ${this.pricingInfo.monthly} over ${this.pricingInfo.monthlyPeriod}</div>
                <div style="font-size: 14px; font-style: italic; text-align: center; opacity: 0.8;">${this.pricingInfo.justification}</div>
            </div>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">🚀 Next Steps</div>
            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>While you wait for your admission confirmation:</strong></p>
                <ul style="padding-left: 20px;">
                    <li style="margin: 8px 0;">📱 Join our WhatsApp community for updates and networking</li>
                    <li style="margin: 8px 0;">📚 Check out our free resources to get a head start</li>
                    <li style="margin: 8px 0;">💻 Ensure your computer meets our technical requirements (we'll send details soon)</li>
                    <li style="margin: 8px 0;">🎯 Start thinking about your career goals and how this program will help you achieve them</li>
                </ul>
            </div>
        </div>

        <div style="margin: 25px 0;">
            <div style="font-size: 18px; font-weight: 600; color: #2e4374; margin-bottom: 15px; border-left: 4px solid #00ffcc; padding-left: 12px;">🌟 Stay Connected</div>
            <p>Join our growing community of tech enthusiasts and stay updated with the latest from NunyaCode Hub:</p>
            <div style="text-align: center; margin: 25px 0;">
                <a href="https://wa.me/233552121155" style="display: inline-block; background: #00ffcc; color: #1a1f2e; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">Join WhatsApp</a>
                <a href="https://x.com/nunyacodehub" style="display: inline-block; background: #00ffcc; color: #1a1f2e; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">Follow on X</a>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>Remember, every expert was once a beginner. Your journey to becoming a tech professional starts with this single step, and we're honored to guide you every step of the way.</p>
            
            <p>Welcome to the future. Welcome to NunyaCode Hub! 🌟</p>
            
            <div style="color: #6c7a89; font-style: italic;">
                Warm regards,<br>
                <strong>The NunyaCode Hub Team</strong><br>
                <em>Empowering African Tech Talent</em>
            </div>
        </div>
    </div>
</body>
</html>`;

            return {
                to: email,
                subject: `Welcome to NunyaCode Hub - Your ${courseInfo.name} Journey Begins! 🚀`,
                html: emailHTML,
                studentName: fullName,
                courseName: courseInfo.name
            };
        }
    };

    // Enhanced welcome email function
    function sendWelcomeEmail(formData) {
        const studentData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            course: formData.get('course')
        };

        // Generate personalized email content
        const emailContent = emailTemplateSystem.generateWelcomeEmailContent(studentData);
        
        if (emailContent) {
            // In a real implementation, this would integrate with an email service like SendGrid, Mailgun, etc.
            // For now, we'll simulate the email sending and log the content
            console.log('Personalized welcome email generated successfully!');
            console.log('To:', emailContent.to);
            console.log('Subject:', emailContent.subject);
            console.log('Student:', emailContent.studentName);
            console.log('Course:', emailContent.courseName);
            
            // Store email content for potential preview/testing
            if (typeof window !== 'undefined') {
                window.lastGeneratedEmail = emailContent;
            }
            
            // Simulate email delivery with realistic timing
            setTimeout(() => {
                console.log(`✅ Welcome email successfully delivered to ${emailContent.studentName} (${emailContent.to})`);
                console.log(`📚 Course: ${emailContent.courseName}`);
                console.log(`📧 Email includes: Program outline, pricing (300 GHS), schedule, next steps, and community links`);
            }, 1500);
            
            return emailContent;
        } else {
            console.error('Failed to generate welcome email - invalid course selection');
            return null;
        }
    }

    // Display email preview in the success message
    function displayEmailPreview(emailContent, successContainer) {
        // Create email preview section
        const emailPreviewSection = document.createElement('div');
        emailPreviewSection.className = 'email-preview-section';
        emailPreviewSection.style.cssText = `
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        `;
        
        emailPreviewSection.innerHTML = `
            <h3 style="color: #2e4374; margin-bottom: 15px; font-size: 18px;">
                <i class="fas fa-envelope" style="margin-right: 10px; color: #00ffcc;"></i>
                Your Welcome Email Preview
            </h3>
            <div style="background: white; border-radius: 6px; padding: 15px; margin-bottom: 15px; font-family: monospace; font-size: 14px; color: #6c757d;">
                <strong>To:</strong> ${emailContent.to}<br>
                <strong>Subject:</strong> ${emailContent.subject}
            </div>
            <div style="max-height: 400px; overflow-y: auto; background: white; border-radius: 6px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                ${emailContent.html}
            </div>
            <p style="margin-top: 15px; font-size: 14px; color: #6c757d; font-style: italic;">
                This personalized welcome email has been generated and is ready to be sent to your email address.
            </p>
        `;
        
        // Add to success container
        successContainer.appendChild(emailPreviewSection);
    }

    // FAQ Accordion functionality
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (question && answer) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');

                    // Close all FAQ items
                    faqItems.forEach(faqItem => {
                        faqItem.classList.remove('active');
                    });

                    // Open clicked item if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Newsletter signup functionality
    function initNewsletterSignup() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');

        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const submitBtn = this.querySelector('button');
                
                if (!emailInput || !submitBtn) return;

                const email = emailInput.value.trim();
                
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address');
                    return;
                }

                // Show loading state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;

                // Simulate subscription
                setTimeout(() => {
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            });
        });
    }

    // Smooth scrolling functionality
    function initSmoothScrolling() {
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Tech nodes animation
    function initTechNodesAnimation() {
        const techNodes = document.getElementById('tech-nodes');
        if (!techNodes) return;

        // Create floating tech nodes dynamically
        const nodeCount = 20;
        
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'tech-node';
            node.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: #00ffcc;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            techNodes.appendChild(node);
        }

        // Connect nodes with lines occasionally
        setTimeout(() => {
            const nodes = techNodes.querySelectorAll('.tech-node');
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            `;

            // Create connection lines between nearby nodes
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    if (Math.random() < 0.1) { // 10% chance of connection
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', `${Math.random() * 100}%`);
                        line.setAttribute('y1', `${Math.random() * 100}%`);
                        line.setAttribute('x2', `${Math.random() * 100}%`);
                        line.setAttribute('y2', `${Math.random() * 100}%`);
                        line.setAttribute('stroke', '#00ffcc');
                        line.setAttribute('stroke-width', '0.5');
                        line.setAttribute('opacity', '0.3');
                        svg.appendChild(line);
                    }
                }
            }

            techNodes.appendChild(svg);
        }, 1000);
    }

    // Button ripple effect
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });

    // Add ripple animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Debounce scroll events
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

    // Optimize scroll event listeners
    const debouncedScrollHandler = debounce(updateActiveNavLink, 100);
    window.removeEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', debouncedScrollHandler);

    // Preload critical resources
    function preloadResources() {
        const criticalImages = [
            'https://pixabay.com/get/g59120b49c51cb704d04fe808bee8bb6850b23b342552d9e6c98d9f155d6bc07d55009479f5049440ec2f6e200b37022f6442c2d4fdd374626c93a4ac881f914e_1280.jpg',
            'https://pixabay.com/get/gd7ff2c79bab4782086d936a52f427933fe8f3c31a7936790e0e3d69c6efbb11468a803be24fe254d6681139e66522039a8f4081f281a2e2c5ecb5fc6d9b4d994_1280.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Initialize preloading
    preloadResources();

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause animations when page is not visible
            clearInterval(testimonialInterval);
            clearInterval(countdownInterval);
        } else {
            // Resume animations when page becomes visible
            if (currentTestimonialIndex !== undefined) {
                testimonialInterval = setInterval(() => {
                    const nextIndex = (currentTestimonialIndex + 1) % document.querySelectorAll('.testimonial-slide').length;
                    const slides = document.querySelectorAll('.testimonial-slide');
                    const dots = document.querySelectorAll('.carousel-dots .dot');
                    
                    slides.forEach((slide, i) => {
                        slide.classList.remove('active');
                        if (i === nextIndex) slide.classList.add('active');
                    });
                    
                    dots.forEach((dot, i) => {
                        dot.classList.remove('active');
                        if (i === nextIndex) dot.classList.add('active');
                    });
                    
                    currentTestimonialIndex = nextIndex;
                }, 5000);
            }
            
            initCountdownTimer();
        }
    });

    // Service Worker registration for PWA capabilities (optional)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }

    // Accessibility enhancements
    function enhanceAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--vibrant-green);
            color: var(--deep-space);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }

        // Enhance keyboard navigation
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && (this.role === 'button' || this.classList.contains('btn'))) {
                    this.click();
                }
            });
        });
    }

    // Initialize accessibility enhancements
    enhanceAccessibility();

    // Error handling for async operations
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        // In production, you might want to send this to an error tracking service
    });

    window.addEventListener('error', function(event) {
        console.error('JavaScript error:', event.error);
        // In production, you might want to send this to an error tracking service
    });

})();
