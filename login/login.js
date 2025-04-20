document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the text
        this.textContent = type === 'password' ? 'Show' : 'Hide';
    });
    
    // Simple validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        resetErrors();
        
        // Validate inputs
        let isValid = true;
        
        if (!emailInput.value) {
            displayError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            displayError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!passwordInput.value) {
            displayError(passwordInput, 'Password is required');
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would send this data to a server
            // For demonstration, we'll just simulate a login
            simulateLogin(emailInput.value, passwordInput.value);
        }
    });
    
    // Display error message
    function displayError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        formGroup.appendChild(errorMessage);
        
        input.style.borderColor = '#e53935';
    }
    
    // Reset all error messages
    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const inputs = [emailInput, passwordInput];
        inputs.forEach(input => {
            input.style.borderColor = 'rgba(0, 0, 0, 0.15)';
        });
    }
    
    // Simulate a login process
    function simulateLogin(email, password) {
        // Show loading state
        const loginBtn = document.querySelector('.login-btn');
        const originalBtnText = loginBtn.textContent;
        loginBtn.textContent = 'Signing in...';
        loginBtn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // In a real app, you would verify credentials with your backend
            
            // For demo purposes, check if it's a demo account
            if (email === 'demo@example.com' && password === 'password123') {
                // Successful login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                // Redirect to home page
                window.location.href = '../front-page/index.html';
            } else {
                // Failed login
                const formGroup = passwordInput.parentElement;
                const errorMessage = document.createElement('p');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Invalid email or password';
                formGroup.appendChild(errorMessage);
                
                // Reset button
                loginBtn.textContent = originalBtnText;
                loginBtn.disabled = false;
            }
        }, 1500);
    }
});