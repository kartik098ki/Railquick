// Configuration
const SUPABASE_URL = 'https://lviykwlunvdfjizxpgvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aXlrd2x1bnZkZmppenhwZ3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NzUyOTYsImV4cCI6MjA3ODI1MTI5Nn0.ugD5GHsfYLKKRidFkvKL8fhQ0U_xXLxrT3lf18g0NW8';

// Form elements
const form = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const messageDiv = document.getElementById('message');

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage('Please enter your email address', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    setLoading(true);
    
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            showMessage('Thank you! We\'ll notify you soon.', 'success');
            emailInput.value = '';
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Supabase Error:', errorData);
            
            if (response.status === 409 || errorData.message?.includes('duplicate') || errorData.message?.includes('unique')) {
                showMessage('Email already registered', 'error');
            } else {
                showMessage('Something went wrong. Please try again.', 'error');
            }
        }
    } catch (error) {
        console.error('Network Error:', error);
        showMessage('Network error. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
});

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.textContent = isLoading ? 'Please wait...' : 'Notify Me';
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    
    // Clear message after 5 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 5000);
}

// Add some interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('Railquick website loaded successfully!');
    
    // Add input focus effects
    emailInput.addEventListener('focus', () => {
        emailInput.parentElement.classList.add('focused');
    });
    
    emailInput.addEventListener('blur', () => {
        emailInput.parentElement.classList.remove('focused');
    });
});