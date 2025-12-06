// Configuration
const SUPABASE_URL = 'https://lviykwlunvdfjizxpgvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aXlrd2x1bnZkZmppenhwZ3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NzUyOTYsImV4cCI6MjA3ODI1MTI5Nn0.ugD5GHsfYLKKRidFkvKL8fhQ0U_xXLxrT3lf18g0NW8';

// DOM Elements
const logoLink = document.getElementById('logoLink');
const homeLink = document.getElementById('homeLink');
const founderLink = document.getElementById('founderLink');
const hiringLink = document.getElementById('hiringLink');
const footerHomeLink = document.getElementById('footerHomeLink');
const footerFounderLink = document.getElementById('footerFounderLink');
const footerHiringLink = document.getElementById('footerHiringLink');
const homeSection = document.getElementById('homeSection');
const founderSection = document.getElementById('founderSection');
const hiringSection = document.getElementById('hiringSection');

// Modal elements
const downloadAppBtn = document.getElementById('downloadAppBtn');
const appModal = document.getElementById('appModal');
const closeModal = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const emailInput = document.getElementById('emailInput');
const notifyBtn = document.getElementById('notifyBtn');
const emailMessage = document.getElementById('emailMessage');

// Form elements
const dontSeeForm = document.getElementById('dontSeeForm');
const dontSeeInput = document.getElementById('dontSeeInput');
const dontSeeMessageDiv = document.getElementById('dontSeeMessage');

// Hiring form elements
const hiringForm = document.getElementById('hiringForm');
const hiringMessageDiv = document.getElementById('hiringMessage');

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');

// Navigation
function showSection(sectionToShow) {
    // Hide all sections
    homeSection.classList.remove('active');
    founderSection.classList.remove('active');
    hiringSection.classList.remove('active');
    
    // Remove active class from all nav links
    homeLink.classList.remove('active');
    founderLink.classList.remove('active');
    hiringLink.classList.remove('active');
    
    // Show selected section and activate corresponding nav link
    switch(sectionToShow) {
        case 'home':
            homeSection.classList.add('active');
            homeLink.classList.add('active');
            break;
        case 'founder':
            founderSection.classList.add('active');
            founderLink.classList.add('active');
            break;
        case 'hiring':
            hiringSection.classList.add('active');
            hiringLink.classList.add('active');
            break;
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    navMenu.classList.remove('mobile-menu-open');
}

// Event listeners for navigation
logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
});

homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
});

founderLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('founder');
});

hiringLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('hiring');
});

// Footer navigation
footerHomeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
});

footerFounderLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('founder');
});

footerHiringLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('hiring');
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-menu-open');
});

// Modal controls
function openModal() {
    appModal.style.display = 'flex';
}

function closeModalFunc() {
    appModal.style.display = 'none';
}

// Event listeners for modal
downloadAppBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);
closeModalBtn.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
appModal.addEventListener('click', (e) => {
    if (e.target === appModal) {
        closeModalFunc();
    }
});

// Helper function to check if response is OK and handle errors
async function handleApiResponse(response, successMessage, messageElement) {
    console.log('Response status:', response.status);
    console.log('Response URL:', response.url);
    
    if (response.ok) {
        showMessage(messageElement, successMessage, 'success');
        return true;
    } else {
        let errorMessage = 'Something went wrong. Please try again.';
        
        try {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            
            // Handle specific error cases
            if (response.status === 409) {
                errorMessage = 'You have already submitted this information.';
            } else if (response.status === 400) {
                errorMessage = 'Invalid data provided. Please check your inputs.';
            } else if (response.status === 401 || response.status === 403) {
                errorMessage = 'Authentication error. Please refresh the page and try again.';
            } else if (response.status === 404) {
                errorMessage = 'Database table not found. Please ensure tables are created in Supabase.';
            } else if (response.status >= 500) {
                errorMessage = 'Server error. Please try again later.';
            }
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
    
    // Clear message after 5 seconds
    setTimeout(() => {
        element.textContent = '';
        element.className = '';
    }, 5000);
}

// Email notification handler
notifyBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    
    // Validation
    if (!email) {
        showMessage(emailMessage, 'Please enter your email address', 'error');
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage(emailMessage, 'Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const originalText = notifyBtn.textContent;
    notifyBtn.textContent = 'Submitting...';
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
        
        const success = await handleApiResponse(
            response, 
            'Thank you! We\'ll notify you when our app launches.', 
            emailMessage
        );
        
        if (success) {
            emailInput.value = '';
        }
    } catch (error) {
        console.error('Network error:', error);
        showMessage(emailMessage, 'Network error. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        notifyBtn.textContent = originalText;
        notifyBtn.disabled = false;
    }
});

// Don't see form submission handler
dontSeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const need = dontSeeInput.value.trim();
    
    // Validation
    if (!need) {
        showMessage(dontSeeMessageDiv, 'Please enter what you need', 'error');
        return;
    }
    
    // Show loading state
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
        
        const success = await handleApiResponse(
            response, 
            'Thank you for your suggestion! We\'ll consider it for our service.', 
            dontSeeMessageDiv
        );
        
        if (success) {
            dontSeeInput.value = '';
        }
    } catch (error) {
        console.error('Network error:', error);
        showMessage(dontSeeMessageDiv, 'Network error. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        submitButton.innerHTML = originalHTML;
        submitButton.disabled = false;
    }
});

// Hiring form submission handler
hiringForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(hiringForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const reason = formData.get('reason').trim();
    const linkedin = formData.get('linkedin').trim();
    const journey = formData.get('journey').trim();
    
    // Validation
    if (!name || !email || !reason || !linkedin) {
        showMessage(hiringMessageDiv, 'Please fill in all required fields', 'error');
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage(hiringMessageDiv, 'Please enter a valid email address', 'error');
        return;
    }
    
    // URL validation for LinkedIn
    try {
        if (linkedin && !new URL(linkedin)) {
            showMessage(hiringMessageDiv, 'Please enter a valid LinkedIn URL', 'error');
            return;
        }
    } catch (e) {
        showMessage(hiringMessageDiv, 'Please enter a valid LinkedIn URL', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = hiringForm.querySelector('.submit-application-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ 
                name, 
                email, 
                phone, 
                reason, 
                linkedin, 
                journey 
            })
        });
        
        const success = await handleApiResponse(
            response, 
            'Thank you for your application! We\'ll be in touch soon.', 
            hiringMessageDiv
        );
        
        if (success) {
            hiringForm.reset();
        }
    } catch (error) {
        console.error('Network error:', error);
        showMessage(hiringMessageDiv, 'Network error. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Simple initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Railquick website loaded');
});
