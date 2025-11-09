// Configuration
const SUPABASE_URL = 'https://lviykwlunvdfjizxpgvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aXlrd2x1bnZkZmppenhwZ3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NzUyOTYsImV4cCI6MjA3ODI1MTI5Nn0.ugD5GHsfYLKKRidFkvKL8fhQ0U_xXLxrT3lf18g0NW8';

// Form elements
const form = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const messageDiv = document.getElementById('message');

// Simple form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Basic validation
    if (!email) {
        showMessage('Please enter your email address', 'error');
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading
    setLoading(true);
    
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            showMessage('Thank you! We\'ll notify you soon.', 'success');
            emailInput.value = '';
        } else {
            // Handle different error types
            if (response.status === 409) {
                showMessage('Email already registered', 'error');
            } else {
                showMessage('Something went wrong. Please try again.', 'error');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Network error. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
});

// Simple loading state
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.textContent = isLoading ? 'Please wait...' : 'Notify Me';
}

// Simple message display
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    
    // Clear message after 5 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 5000);
}

// Simple initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Railquick website loaded');
});