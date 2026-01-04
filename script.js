// Configuration
const SUPABASE_URL = 'https://lviykwlunvdfjizxpgvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aXlrd2x1bnZkZmppenhwZ3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NzUyOTYsImV4cCI6MjA3ODI1MTI5Nn0.ugD5GHsfYLKKRidFkvKL8fhQ0U_xXLxrT3lf18g0NW8';

// Direct download link for the APK file
const APK_URL = 'https://raw.githubusercontent.com/kartik098ki/Railquick/main/app-debug.apk';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // --- DOM ELEMENT SELECTION ---
    // Navigation
    const logoLink = document.getElementById('logoLink');
    const homeLink = document.getElementById('homeLink');
    const aboutLink = document.getElementById('aboutLink');
    const contactLink = document.getElementById('contactLink');
    const hiringLink = document.getElementById('hiringLink');
    const footerHomeLink = document.getElementById('footerHomeLink');
    const footerAboutLink = document.getElementById('footerAboutLink');
    const footerContactLink = document.getElementById('footerContactLink');
    const footerHiringLink = document.getElementById('footerHiringLink');
    const mobileHomeLink = document.getElementById('mobileHomeLink');
    const mobileAboutLink = document.getElementById('mobileAboutLink');
    const mobileContactLink = document.getElementById('mobileContactLink');
    const mobileHiringLink = document.getElementById('mobileHiringLink');
    const aboutHiringLink = document.getElementById('aboutHiringLink');
    
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    
    // Sections
    const homeSection = document.getElementById('homeSection');
    const aboutSection = document.getElementById('aboutSection');
    const contactSection = document.getElementById('contactSection');
    const hiringSection = document.getElementById('hiringSection');

    // --- Try Now Modal Elements ---
    const tryNowBtn = document.getElementById('tryNowBtn');
    const tryNowModal = document.getElementById('tryNowModal');
    const closeTryNowModal = document.getElementById('closeTryNowModal');
    const closeTryNowModalBtn = document.getElementById('closeTryNowModalBtn');
    const tryNowEmailInput = document.getElementById('tryNowEmailInput');
    const tryNowNotifyBtn = document.getElementById('tryNowNotifyBtn');
    const tryNowEmailMessage = document.getElementById('tryNowEmailMessage');

    // Other Buttons & Forms
    const downloadAppBtn = document.getElementById('downloadAppBtn');
    const experienceNotifyForm = document.getElementById('experienceNotifyForm');
    const experienceEmailInput = document.getElementById('experienceEmailInput');
    const experienceNotifyBtn = document.getElementById('experienceNotifyBtn');
    const experienceEmailMessage = document.getElementById('experienceEmailMessage');
    const contactForm = document.getElementById('contactForm');
    const contactMessageDiv = document.getElementById('contactMessage');
    const hiringForm = document.getElementById('hiringForm');
    const hiringMessageDiv = document.getElementById('hiringMessage');
    const faqItems = document.querySelectorAll('.faq-item');

    // --- INITIALIZATION ---
    // Ensure modals are hidden on page load
    if (tryNowModal) tryNowModal.style.display = 'none';

    // --- CORE FUNCTIONS ---

    /**
     * Handles navigation between different sections of the single-page application.
     * @param {string} sectionToShow - The ID of the section to display.
     */
    function showSection(sectionToShow) {
        // Hide all sections and remove active class from nav links
        const sections = [homeSection, aboutSection, contactSection, hiringSection];
        const navLinks = [homeLink, aboutLink, contactLink, hiringLink];
        const mobileNavLinks = [mobileHomeLink, mobileAboutLink, mobileContactLink, mobileHiringLink];

        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        // Show selected section and activate corresponding nav link
        switch(sectionToShow) {
            case 'home':
                homeSection.classList.add('active');
                homeLink.classList.add('active');
                mobileHomeLink.classList.add('active');
                break;
            case 'about':
                aboutSection.classList.add('active');
                aboutLink.classList.add('active');
                mobileAboutLink.classList.add('active');
                break;
            case 'contact':
                contactSection.classList.add('active');
                contactLink.classList.add('active');
                mobileContactLink.classList.add('active');
                break;
            case 'hiring':
                hiringSection.classList.add('active');
                hiringLink.classList.add('active');
                mobileHiringLink.classList.add('active');
                break;
        }
        
        // Close mobile menu if open
        if (mobileNavOverlay.classList.contains('active')) {
            mobileNavOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Opens the "Try Now" modal.
     */
    function openTryNowModal() {
        if (tryNowModal) {
            tryNowModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    /**
     * Closes the "Try Now" modal and resets its state.
     */
    function closeTryNowModalFunc() {
        if (tryNowModal) {
            tryNowModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore background scrolling
            tryNowEmailInput.value = '';
            tryNowEmailMessage.textContent = '';
            tryNowEmailMessage.className = '';
        }
    }

    /**
     * Displays a success or error message in a specified element.
     * @param {HTMLElement} element - The element to display the message in.
     * @param {string} text - The message to display.
     * @param {string} type - 'success' or 'error'.
     */
    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = type === 'success' ? 'success-message' : 'error-message';
    }

    /**
     * Shows a loading spinner inside a button and disables it.
     * @param {HTMLElement} buttonElement - The button to apply loading state to.
     */
    function showLoading(buttonElement) {
        const btnText = buttonElement.querySelector('.btn-text');
        const btnLoader = buttonElement.querySelector('.btn-loader');
        if (btnText && btnLoader) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        }
        buttonElement.disabled = true;
    }

    /**
     * Hides the loading spinner and restores the button's original content.
     * @param {HTMLElement} buttonElement - The button to revert.
     * @param {string} originalContent - The original HTML content of the button.
     */
    function hideLoading(buttonElement, originalContent) {
        const btnText = buttonElement.querySelector('.btn-text');
        const btnLoader = buttonElement.querySelector('.btn-loader');
        if (btnText && btnLoader) {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
        }
        buttonElement.disabled = false;
        // Restore original HTML to handle icons correctly
        buttonElement.innerHTML = originalContent;
    }
    
    /**
     * Handles API responses, showing appropriate success/error messages.
     * @param {Response} response - The fetch API response object.
     * @param {string} successMessage - The message to show on success.
     * @param {HTMLElement} messageElement - The element to display the message in.
     * @returns {boolean} - True if successful, false otherwise.
     */
    async function handleApiResponse(response, successMessage, messageElement) {
        console.log('Response status:', response.status);
        if (response.ok) {
            showMessage(messageElement, successMessage, 'success');
            return true;
        } else {
            let errorMessage = 'Something went wrong. Please try again.';
            try {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                if (response.status === 409) errorMessage = 'You have already submitted this information.';
                else if (response.status === 400) errorMessage = 'Invalid data provided. Please check your inputs.';
                else if (response.status === 401 || response.status === 403) errorMessage = 'Authentication error. Please refresh the page and try again.';
                else if (response.status === 404) errorMessage = 'Database table not found. Please ensure tables are created in Supabase.';
                else if (response.status >= 500) errorMessage = 'Server error. Please try again later.';
            } catch (e) {
                console.error('Error parsing error response:', e);
            }
            showMessage(messageElement, errorMessage, 'error');
            return false;
        }
    }

    // --- EVENT LISTENERS ---

    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNavOverlay.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // --- Try Now Modal Functionality ---
    if (tryNowBtn) {
        tryNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Try Now button clicked');
            openTryNowModal();
        });
    }

    if (closeTryNowModal) closeTryNowModal.addEventListener('click', closeTryNowModalFunc);
    if (closeTryNowModalBtn) closeTryNowModalBtn.addEventListener('click', closeTryNowModalFunc);
    
    // Close modal when clicking outside of it
    if (tryNowModal) {
        tryNowModal.addEventListener('click', function(e) {
            if (e.target === tryNowModal) {
                closeTryNowModalFunc();
            }
        });
    }

    // --- Try Now Email Submission Handler ---
    if (tryNowNotifyBtn) {
        tryNowNotifyBtn.addEventListener('click', async () => {
            const email = tryNowEmailInput.value.trim();
            if (!email) {
                showMessage(tryNowEmailMessage, 'Please enter your email address', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(tryNowEmailMessage, 'Please enter a valid email address', 'error');
                return;
            }
            
            const originalBtnContent = tryNowNotifyBtn.innerHTML;
            showLoading(tryNowNotifyBtn);

            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/notifications`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({ email })
                });
                
                const success = await handleApiResponse(response, 'Thank you! We\'ll notify you when we launch.', tryNowEmailMessage);
                if (success) {
                    tryNowEmailInput.value = '';
                    setTimeout(() => closeTryNowModalFunc(), 2500); // Close modal after showing success message
                }
            } catch (error) {
                console.error('Network error:', error);
                showMessage(tryNowEmailMessage, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                hideLoading(tryNowNotifyBtn, originalBtnContent);
            }
        });
    }

    // --- Test Phase Button ---
    if (document.getElementById('testPhaseBtn')) {
        document.getElementById('testPhaseBtn').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Test Phase button clicked');
            // For now, let's scroll to the experience section
            document.querySelector('.experience-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Download App Functionality (if button exists) ---
    if (downloadAppBtn) {
        downloadAppBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Download app button clicked');
            const originalContent = downloadAppBtn.innerHTML;
            downloadAppBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            downloadAppBtn.disabled = true;
            const a = document.createElement('a');
            a.href = APK_URL;
            a.download = 'app-debug.apk';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => {
                downloadAppBtn.innerHTML = originalContent;
                downloadAppBtn.disabled = false;
            }, 3000);
        });
    }
    
    // --- Navigation Event Listeners ---
    if (logoLink) logoLink.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
    if (homeLink) homeLink.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
    if (aboutLink) aboutLink.addEventListener('click', (e) => { e.preventDefault(); showSection('about'); });
    if (contactLink) contactLink.addEventListener('click', (e) => { e.preventDefault(); showSection('contact'); });
    if (hiringLink) hiringLink.addEventListener('click', (e) => { e.preventDefault(); showSection('hiring'); });
    
    // Footer navigation
    if (footerHomeLink) footerHomeLink.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
    if (footerAboutLink) footerAboutLink.addEventListener('click', (e) => { e.preventDefault(); showSection('about'); });
    if (footerContactLink) footerContactLink.addEventListener('click', (e) => { e.preventDefault(); showSection('contact'); });
    if (footerHiringLink) footerHiringLink.addEventListener('click', (e) => { e.preventDefault(); showSection('hiring'); });

    // Mobile navigation links in header
    if (mobileHomeLink) mobileHomeLink.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
    if (mobileAboutLink) mobileAboutLink.addEventListener('click', (e) => { e.preventDefault(); showSection('about'); });
    if (mobileContactLink) mobileContactLink.addEventListener('click', (e) => { e.preventDefault(); showSection('contact'); });
    if (mobileHiringLink) mobileHiringLink.addEventListener('click', (e) => { e.preventDefault(); showSection('hiring'); });

    // "Apply Now" button in About Us section
    if (aboutHiringLink) aboutHiringLink.addEventListener('click', (e) => { e.preventDefault(); showSection('hiring'); });

    // --- FAQ Section ---
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // --- Experience notification form handler ---
    if (experienceNotifyForm) {
        experienceNotifyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = experienceEmailInput.value.trim();
            if (!email) { showMessage(experienceEmailMessage, 'Please enter your email address', 'error'); return; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { showMessage(experienceEmailMessage, 'Please enter a valid email address', 'error'); return; }
            
            const originalBtnContent = experienceNotifyBtn.innerHTML;
            showLoading(experienceNotifyBtn);
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/notifications`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Prefer': 'return=minimal' },
                    body: JSON.stringify({ email })
                });
                
                const success = await handleApiResponse(response, 'Thank you for joining our waitlist! We\'ll notify you when RailQuick launches.', experienceEmailMessage);
                if (success) experienceEmailInput.value = '';
            } catch (error) {
                console.error('Network error:', error);
                showMessage(experienceEmailMessage, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                hideLoading(experienceNotifyBtn, originalBtnContent);
            }
        });
    }

    // --- Contact form submission handler ---
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const inquiry = formData.get('inquiry').trim();
            
            if (!name || !email || !inquiry) { showMessage(contactMessageDiv, 'Please fill in all required fields', 'error'); return; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { showMessage(contactMessageDiv, 'Please enter a valid email address', 'error'); return; }
            
            const submitButton = contactForm.querySelector('.submit-application-btn');
            const originalBtnText = submitButton.querySelector('.btn-text').textContent;
            showLoading(submitButton);
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Prefer': 'return=minimal' },
                    body: JSON.stringify({ name, email, inquiry })
                });
                
                const success = await handleApiResponse(response, 'Thank you for your message! We\'ll get back to you soon.', contactMessageDiv);
                if (success) contactForm.reset();
            } catch (error) {
                console.error('Network error:', error);
                showMessage(contactMessageDiv, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                hideLoading(submitButton, originalBtnText);
            }
        });
    }

    // --- Hiring form submission handler ---
    if (hiringForm) {
        hiringForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(hiringForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const phone = formData.get('phone').trim();
            const reason = formData.get('reason').trim();
            const linkedin = formData.get('linkedin').trim();
            const journey = formData.get('journey').trim();
            
            if (!name || !email || !reason || !linkedin) { showMessage(hiringMessageDiv, 'Please fill in all required fields', 'error'); return; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { showMessage(hiringMessageDiv, 'Please enter a valid email address', 'error'); return; }
            try { if (linkedin && !new URL(linkedin)) { throw new Error('Invalid URL'); } } catch (e) { showMessage(hiringMessageDiv, 'Please enter a valid LinkedIn URL', 'error'); return; }
            
            const submitButton = hiringForm.querySelector('.submit-application-btn');
            const originalBtnText = submitButton.querySelector('.btn-text').textContent;
            showLoading(submitButton);
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Prefer': 'return=minimal' },
                    body: JSON.stringify({ name, email, phone, reason, linkedin, journey })
                });
                
                const success = await handleApiResponse(response, 'Thank you for your application! We\'ll be in touch soon.', hiringMessageDiv);
                if (success) hiringForm.reset();
            } catch (error) {
                console.error('Network error:', error);
                showMessage(hiringMessageDiv, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                hideLoading(submitButton, originalBtnText);
            }
        });
    }

    // --- Statistics Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200;

    const countUp = () => {
        statNumbers.forEach(statNumber => {
            const target = +statNumber.getAttribute('data-target');
            const count = +statNumber.innerText;
            const increment = target / speed;
            
            if (count < target) {
                statNumber.innerText = Math.ceil(count + increment);
                setTimeout(countUp, 10);
            } else {
                statNumber.innerText = target;
            }
        });
    };

    // Trigger counter animation when stats section is in viewport
    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- Newsletter Form Handler ---
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterMessage = document.getElementById('newsletterMessage');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterEmail.value.trim();
            
            if (!email) {
                showMessage(newsletterMessage, 'Please enter your email address', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(newsletterMessage, 'Please enter a valid email address', 'error');
                return;
            }
            
            const originalBtnContent = newsletterForm.querySelector('.newsletter-btn').innerHTML;
            showLoading(newsletterForm.querySelector('.newsletter-btn'));
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/newsletter`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({ email })
                });
                
                const success = await handleApiResponse(response, 'Thank you for subscribing! We\'ll keep you updated with our latest news.', newsletterMessage);
                if (success) {
                    newsletterForm.reset();
                }
            } catch (error) {
                console.error('Network error:', error);
                showMessage(newsletterMessage, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                hideLoading(newsletterForm.querySelector('.newsletter-btn'), originalBtnContent);
            }
        });
    }

    // --- Pause testimonial animation on hover ---
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const track = document.querySelector('.testimonial-track');
            if (track) {
                track.style.animationPlayState = 'paused';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const track = document.querySelector('.testimonial-track');
            if (track) {
                track.style.animationPlayState = 'running';
            }
        });
    });

    console.log('Railquick website initialized successfully');
});
