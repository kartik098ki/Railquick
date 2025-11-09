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
            showMessage('🎉 Awesome! You\'re on the list! Get ready for the revolution!', 'success');
            emailInput.value = '';
            
            // Add celebration effect
            celebrateSuccess();
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Supabase Error:', errorData);
            
            if (response.status === 409 || errorData.message?.includes('duplicate') || errorData.message?.includes('unique')) {
                showMessage('This email is already registered', 'error');
            } else {
                showMessage('Something went wrong. Please try again.', 'error');
            }
        }
    } catch (error) {
        console.error('Network Error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
        setLoading(false);
    }
});

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.textContent = isLoading ? 'Joining...' : 'Get Notified';
    
    if (isLoading) {
        submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';
    } else {
        submitBtn.style.background = 'linear-gradient(135deg, #4f46e5, #7c3aed)';
    }
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}-message`;
    
    // Clear message after 6 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 6000);
}

// Celebration effect
function celebrateSuccess() {
    // Create confetti effect
    for (let i = 0; i < 20; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${getRandomColor()};
        left: ${Math.random() * 100}%;
        top: -10px;
        opacity: 1;
        transform: rotate(${Math.random() * 360}deg);
        transition: all 2s ease-out;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(confetti);
    
    // Animate confetti
    setTimeout(() => {
        confetti.style.top = '100%';
        confetti.style.opacity = '0';
        confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
    }, 100);
    
    // Remove confetti
    setTimeout(() => {
        document.body.removeChild(confetti);
    }, 2100);
}

function getRandomColor() {
    const colors = ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚂 Railquick website loaded successfully!');
    
    // Add input focus effects
    emailInput.addEventListener('focus', () => {
        emailInput.parentElement.style.transform = 'scale(1.02)';
    });
    
    emailInput.addEventListener('blur', () => {
        emailInput.parentElement.style.transform = 'scale(1)';
    });
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Add typing effect to title
function addTypingEffect() {
    const title = document.querySelector('.title');
    if (title) {
        title.style.opacity = '0';
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transition = 'opacity 1s ease-in';
        }, 500);
    }
}

// Initialize
addTypingEffect();