// Google OAuth Configuration
const GOOGLE_CLIENT_ID = '204371247654-3i8cj8r08biinvd322mjh3fs6s8dnee1.apps.googleusercontent.com';
const BACKEND_URL = 'https://platform-krns.onrender.com';

// Get the current origin
function getCurrentOrigin() {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    // Handle all localhost variations
    if (hostname === 'localhost' || 
        hostname === '[::1]' || 
        hostname === '[::]' ||
        hostname === '127.0.0.1') {
        return `http://localhost:${port || '5173'}`;
    }
    
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

// Initialize Google OAuth
function initializeGoogleAuth() {
    // Check if script is already loaded
    if (window.google && window.google.accounts) {
        initializeGoogleSignIn();
        return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
        console.log('Google Identity Services loaded');
        initializeGoogleSignIn();
    };
    script.onerror = (error) => {
        console.error('Error loading Google Identity Services:', error);
    };
    document.head.appendChild(script);
}

function initializeGoogleSignIn() {
    const googleSignInBtn = document.getElementById('googleSignIn');
    if (!googleSignInBtn) {
        console.error('Google Sign-In button container not found');
        return;
    }

    // Clear any existing button
    googleSignInBtn.innerHTML = '';

    try {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            context: 'signin',
            ux_mode: 'popup',
            flow: 'implicit'
        });

        google.accounts.id.renderButton(
            googleSignInBtn,
            { 
                type: 'standard',
                theme: 'outline',
                size: 'large',
                width: googleSignInBtn.offsetWidth || 300,
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left',
                locale: 'en'
            }
        );
        
        // Also show One Tap UI if no user is signed in
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            google.accounts.id.prompt(notification => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    console.log('One Tap prompt was not displayed');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
    }
}

function handleCredentialResponse(response) {
    console.log('Google Sign In successful');
    if (response.credential) {
        // Send the token to your backend
        sendTokenToBackend(response.credential);
    } else {
        showMessage('Sign in was cancelled or failed. Please try again.', 'error');
    }
}

// Send token to backend
async function sendTokenToBackend(credential) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential: credential })
        });

        if (response.ok) {
            const data = await response.json();
            // Store the JWT token and user data
            localStorage.setItem('jwt_token', data.token);
            if (data.user) {
                localStorage.setItem('user_name', data.user.name || 'User');
                localStorage.setItem('user_email', data.user.email || '');
                localStorage.setItem('user_picture', data.user.picture || '');
            }
            // Redirect to dashboard
            window.location.href = '/platform.html';
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        console.error('Error sending token to backend:', error);
        showMessage('Authentication failed. Please try again.', 'error');
    }
}

// Show message function
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;
    
    // Remove any existing message
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add the new message
    const container = document.querySelector('.login-window') || document.body;
    container.appendChild(messageDiv);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Check for URL parameters on page load
function checkAuthStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');
    
    if (status === 'success' && message) {
        showMessage(decodeURIComponent(message), 'success');
    } else if (status === 'error' && message) {
        showMessage(decodeURIComponent(message), 'error');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGoogleAuth();
    checkAuthStatus();
}); 