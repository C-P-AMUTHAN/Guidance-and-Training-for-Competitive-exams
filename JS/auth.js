$(document).ready(function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Toggle Password Visibility
    $('.toggle-password').click(function() {
        var input = $(this).prev('input');
        
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            $(this).removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            $(this).removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // Form Validation - Sign In
    $('#signin-form').submit(function(e) {
        e.preventDefault();
        
        var isValid = true;
        var email = $('#email').val();
        var password = $('#password').val();
        
        // Reset error messages
        $('.error-message').text('');
        
        // Validate email
        if (!email) {
            $('#email-error').text('Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            $('#email-error').text('Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            $('#password-error').text('Password is required');
            isValid = false;
        }
        
        if (isValid) {
            // Check if user exists in local storage
            var users = JSON.parse(localStorage.getItem('users')) || [];
            var user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Set logged in user in session
                sessionStorage.setItem('currentUser', JSON.stringify({
                    name: user.firstName + ' ' + user.lastName,
                    email: user.email
                }));
                
                // Simulate successful login
                $(this).find('button').html('<i class="fas fa-spinner fa-spin"></i> Signing In...');
                
                setTimeout(function() {
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                $('#password-error').text('Invalid email or password');
            }
        }
    });

    // Form Validation - Sign Up
    $('#signup-form').submit(function(e) {
        e.preventDefault();
        
        var isValid = true;
        var firstName = $('#first-name').val();
        var lastName = $('#last-name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirm-password').val();
        var terms = $('#terms').is(':checked');
        
        // Reset error messages
        $('.error-message').text('');
        
        // Validate first name
        if (!firstName) {
            $('#first-name-error').text('First name is required');
            isValid = false;
        }
        
        // Validate last name
        if (!lastName) {
            $('#last-name-error').text('Last name is required');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            $('#email-error').text('Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            $('#email-error').text('Please enter a valid email address');
            isValid = false;
        } else {
            // Check if email already exists
            var existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            if (existingUsers.some(user => user.email === email)) {
                $('#email-error').text('Email already exists');
                isValid = false;
            }
        }
        
        // Validate phone
        if (!phone) {
            $('#phone-error').text('Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            $('#phone-error').text('Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            $('#password-error').text('Password is required');
            isValid = false;
        } else if (password.length < 8) {
            $('#password-error').text('Password must be at least 8 characters');
            isValid = false;
        }
        
        // Validate confirm password
        if (!confirmPassword) {
            $('#confirm-password-error').text('Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            $('#confirm-password-error').text('Passwords do not match');
            isValid = false;
        }
        
        // Validate terms
        if (!terms) {
            isValid = false;
            alert('Please agree to the Terms & Conditions');
        }
        
        if (isValid) {
            // Save user to local storage
            var users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password
            });
            localStorage.setItem('users', JSON.stringify(users));
            
            // Set logged in user in session
            sessionStorage.setItem('currentUser', JSON.stringify({
                name: firstName + ' ' + lastName,
                email: email
            }));
            
            // Simulate successful registration
            $(this).find('button').html('<i class="fas fa-spinner fa-spin"></i> Creating Account...');
            
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 1000);
        }
    });

    // Helper Functions
    function isValidEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function isValidPhone(phone) {
        var regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    // Social Login Buttons
    $('.social-btn').click(function() {
        var provider = $(this).hasClass('google') ? 'Google' : 'Facebook';
        
        $(this).html('<i class="fas fa-spinner fa-spin"></i> Connecting...');
        
        setTimeout(function() {
            alert('This is a demo. ' + provider + ' login would be implemented in a real application.');
            $('.social-btn').html(provider === 'Google' ? '<i class="fab fa-google"></i> Google' : '<i class="fab fa-facebook-f"></i> Facebook');
        }, 1000);
    });
});

// Check Login Status Function (Global)
function checkLoginStatus() {
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser) {
        // User is logged in
        $('.auth-buttons').hide();
        $('.user-account').show();
        $('.user-name').text(currentUser.name);
        
        // Add logged in class to body
        $('body').addClass('logged-in');
    } else {
        // User is not logged in
        $('.auth-buttons').show();
        $('.user-account').hide();
        
        // Remove logged in class from body
        $('body').removeClass('logged-in');
    }
}

// Logout Function (Global)
function logoutUser() {
    sessionStorage.removeItem('currentUser');
    checkLoginStatus();
    
    // Redirect to home page
    window.location.href = 'index.html';
}