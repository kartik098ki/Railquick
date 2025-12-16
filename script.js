// Configuration
const SUPABASE_URL = 'https://lviykwlunvdfjizxpgvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aXlrd2x1bnZkZmppenhwZ3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NzUyOTYsImV4cCI6MjA3ODI1MTI5Nn0.ugD5GHsfYLKKRidFkvKL8fhQ0U_xXLxrT3lf18g0NW8';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // DOM Elements
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
    const homeSection = document.getElementById('homeSection');
    const aboutSection = document.getElementById('aboutSection');
    const contactSection = document.getElementById('contactSection');
    const hiringSection = document.getElementById('hiringSection');

    // Modal elements
    const downloadAppBtn = document.getElementById('downloadAppBtn');
    const appModal = document.getElementById('appModal');
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const emailInput = document.getElementById('emailInput');
    const notifyBtn = document.getElementById('notifyBtn');
    const emailMessage = document.getElementById('emailMessage');

    // Launch notification form elements
    const launchNotifyForm = document.getElementById('launchNotifyForm');
    const launchEmailInput = document.getElementById('launchEmailInput');
    const launchNotifyBtn = document.getElementById('launchNotifyBtn');
    const launchEmailMessage = document.getElementById('launchEmailMessage');

    // Form elements
    const dontSeeForm = document.getElementById('dontSeeForm');
    const dontSeeInput = document.getElementById('dontSeeInput');
    const dontSeeMessageDiv = document.getElementById('dontSeeMessage');

    // Contact form elements
    const contactForm = document.getElementById('contactForm');
    const contactMessageDiv = document.getElementById('contactMessage');

    // Hiring form elements
    const hiringForm = document.getElementById('hiringForm');
    const hiringMessageDiv = document.getElementById('hiringMessage');

    // FAQ elements
    const faqItems = document.querySelectorAll('.faq-item');

    // Ensure modal is hidden on page load
    if (appModal) {
        appModal.style.display = 'none';
        console.log('Modal hidden on page load');
    }

    // Navigation functionality
    function showSection(sectionToShow) {
        // Hide all sections
        homeSection.classList.remove('active');
        aboutSection.classList.remove('active');
        contactSection.classList.remove('active');
        hiringSection.classList.remove('active');
        
        // Remove active class from all nav links
        homeLink.classList.remove('active');
        aboutLink.classList.remove('active');
        contactLink.classList.remove('active');
        hiringLink.classList.remove('active');
        
        // Remove active class from mobile nav links
        mobileHomeLink.classList.remove('active');
        mobileAboutLink.classList.remove('active');
        mobileContactLink.classList.remove('active');
        mobileHiringLink.classList.remove('active');
        
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
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Modal functionality
    function openModal() {
        console.log('Opening modal');
        if (appModal) {
            appModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeModalFunc() {
        console.log('Closing modal');
        if (appModal) {
            appModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore background scrolling
            emailInput.value = '';
            emailMessage.textContent = '';
            emailMessage.className = '';
        }
    }

    // Event listeners for navigation
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

    // Modal controls
    if (downloadAppBtn) {
        console.log('Download app button found, adding event listener');
        downloadAppBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Download app button clicked');
            openModal();
        });
    } else {
        console.error('Download app button not found!');
    }

    if (closeModal) closeModal.addEventListener('click', closeModalFunc);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModalFunc);

    // Close modal when clicking outside
    if (appModal) {
        appModal.addEventListener('click', function(e) {
            if (e.target === appModal) {
                closeModalFunc();
            }
        });
    }

    // FAQ Section
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

    // Helper function to check if response is OK and handle errors
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

    // Helper function to show messages
    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = type === 'success' ? 'success-message' : 'error-message';
    }

    // Function to show loading spinner
    function showLoading(buttonElement) {
        const btnText = buttonElement.querySelector('.btn-text');
        const btnLoader = buttonElement.querySelector('.btn-loader');
        if (btnText && btnLoader) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        }
        buttonElement.disabled = true;
    }

    // Function to hide loading spinner
    function hideLoading(buttonElement, originalText) {
        const btnText = buttonElement.querySelector('.btn-text');
        const btnLoader = buttonElement.querySelector('.btn-loader');
        if (btnText && btnLoader) {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
        }
        buttonElement.disabled = false;
    }

    // Email notification handler
    if (notifyBtn) {
        notifyBtn.addEventListener('click', async () => {
            const email = emailInput.value.trim();
            if (!email) {
                showMessage(emailMessage, 'Please enter your email address', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(emailMessage, 'Please enter a valid email address', 'error');
                return;
            }
            
            const originalBtnContent = notifyBtn.innerHTML;
            notifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            notifyBtn.disabled = true;

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
                
                const success = await handleApiResponse(response, 'Thank you! We\'ll notify you when our app launches.', emailMessage);
                if (success) {
                    emailInput.value = '';
                    setTimeout(() => closeModalFunc(), 2500);
                }
            } catch (error) {
                console.error('Network error:', error);
                showMessage(emailMessage, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                notifyBtn.innerHTML = originalBtnContent;
                notifyBtn.disabled = false;
            }
        });
    }

    // Launch notification form handler
    if (launchNotifyForm) {
        launchNotifyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = launchEmailInput.value.trim();
            if (!email) {
                showMessage(launchEmailMessage, 'Please enter your email address', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(launchEmailMessage, 'Please enter a valid email address', 'error');
                return;
            }
            
            const originalBtnContent = launchNotifyBtn.innerHTML;
            launchNotifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            launchNotifyBtn.disabled = true;

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
                
                const success = await handleApiResponse(response, 'Thank you! We\'ll notify you when our service launches in Delhi.', launchEmailMessage);
                if (success) {
                    launchEmailInput.value = '';
                }
            } catch (error) {
                console.error('Network error:', error);
                showMessage(launchEmailMessage, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                launchNotifyBtn.innerHTML = originalBtnContent;
                launchNotifyBtn.disabled = false;
            }
        });
    }

    // Don't see form submission handler
    if (dontSeeForm) {
        dontSeeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const need = dontSeeInput.value.trim();
            if (!need) {
                showMessage(dontSeeMessageDiv, 'Please enter what you need', 'error');
                return;
            }
            
            const submitButton = dontSeeForm.querySelector('.dont-see-submit-btn');
            const originalHTML = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;

            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/needs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({ need })
                });
                
                const success = await handleApiResponse(response, 'Thank you for your suggestion! We\'ll consider it for our service.', dontSeeMessageDiv);
                if (success) {
                    dontSeeInput.value = '';
                }
            } catch (error) {
                console.error('Network error:', error);
                showMessage(dontSeeMessageDiv, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
            }
        });
    }

    // Contact form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const inquiry = formData.get('inquiry').trim();
            
            if (!name || !email || !inquiry) {
                showMessage(contactMessageDiv, 'Please fill in all required fields', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(contactMessageDiv, 'Please enter a valid email address', 'error');
                return;
            }
            
            const submitButton = contactForm.querySelector('.submit-application-btn');
            const originalBtnText = submitButton.querySelector('.btn-text').textContent;
            showLoading(submitButton);
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({ name, email, inquiry })
                });
                
                const success = await handleApiResponse(response, 'Thank you for your message! We\'ll get back to you soon.', contactMessageDiv);
                if (success) {
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Network error:', error);
                showMessage(contactMessageDiv, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                hideLoading(submitButton, originalBtnText);
            }
        });
    }

    // Hiring form submission handler
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
            
            if (!name || !email || !reason || !linkedin) {
                showMessage(hiringMessageDiv, 'Please fill in all required fields', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(hiringMessageDiv, 'Please enter a valid email address', 'error');
                return;
            }
            try {
                if (linkedin && !new URL(linkedin)) {
                    showMessage(hiringMessageDiv, 'Please enter a valid LinkedIn URL', 'error');
                    return;
                }
            } catch (e) {
                showMessage(hiringMessageDiv, 'Please enter a valid LinkedIn URL', 'error');
                return;
            }
            
            const submitButton = hiringForm.querySelector('.submit-application-btn');
            const originalBtnText = submitButton.querySelector('.btn-text').textContent;
            showLoading(submitButton);
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({ name, email, phone, reason, linkedin, journey })
                });
                
                const success = await handleApiResponse(response, 'Thank you for your application! We\'ll be in touch soon.', hiringMessageDiv);
                if (success) {
                    hiringForm.reset();
                }
            } catch (error) {
                console.error('Network error:', error);
                showMessage(hiringMessageDiv, 'Network error. Please check your connection and try again.', 'error');
            } finally {
                hideLoading(submitButton, originalBtnText);
            }
        });
    }

    console.log('Railquick website initialized successfully');
});
