// Declare $ if it's not already in scope (e.g., if jQuery isn't globally available)
var $ = jQuery;

// Mock functions for checkLoginStatus and logoutUser
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName') || 'User';
    
    if (isLoggedIn) {
        $('.auth-buttons').hide();
        $('.user-account').addClass('active');
        $('.user-name').text(userName);
        $('body').addClass('logged-in');
    } else {
        $('.auth-buttons').show();
        $('.user-account').removeClass('active');
        $('.user-name').text('User');
        $('body').removeClass('logged-in');
    }
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    checkLoginStatus();
    window.location.href = 'index.html';
}

$(document).ready(function() {
    // Clear any existing login state on page load
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    
    // Check login status on page load
    checkLoginStatus();
    
    // Mobile Menu Toggle
    $('.menu-toggle').click(function() {
        $('nav').toggleClass('active');
    });

    // Smooth Scrolling for Anchor Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        $('html, body').animate({
            'scrollTop': $target.offset().top - 70
        }, 800, 'swing');
    });

    // Toppers Slider Controls
    $('.next-btn').click(function() {
        $('.topper-slider').animate({
            scrollLeft: $('.topper-slider').scrollLeft() + 350
        }, 300);
    });
    
    $('.prev-btn').click(function() {
        $('.topper-slider').animate({
            scrollLeft: $('.topper-slider').scrollLeft() - 350
        }, 300);
    });

    // Fixed Header on Scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('fixed');
        } else {
            $('header').removeClass('fixed');
        }
    });

    // Form Submission
    $('.contact-form').submit(function(e) {
        e.preventDefault();
        
        // Simulate form submission
        $(this).find('button').html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        
        setTimeout(function() {
            $('.contact-form').html('<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you for your message! We will get back to you soon.</p></div>');
        }, 2000);
    });

    // Newsletter Subscription
    $('.footer-newsletter form').submit(function(e) {
        e.preventDefault();
        
        var email = $(this).find('input[type="email"]').val();
        
        if (email) {
            $(this).html('<p class="success-message">Thank you for subscribing!</p>');
        }
    });

    // User Account Dropdown Toggle
    $('.user-account-toggle').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.user-dropdown').toggleClass('active');
    });

    // Close dropdown when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.user-account').length) {
            $('.user-dropdown').removeClass('active');
        }
    });

    // Handle logout
    $('.logout-btn').click(function(e) {
        e.preventDefault();
        logoutUser();
    });

    // Handle Sign In Form
    $('#signin-form').submit(function(e) {
        e.preventDefault();
        const email = $('#signin-email').val();
        const password = $('#signin-password').val();
        
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', email.split('@')[0]);
        checkLoginStatus();
        
        // Redirect to home page
        window.location.href = 'index.html';
    });

    // Handle Sign Up Form
    $('#signup-form').submit(function(e) {
        e.preventDefault();
        const name = $('#signup-name').val();
        const email = $('#signup-email').val();
        const password = $('#signup-password').val();
        
        // Simulate successful registration and login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        checkLoginStatus();
        
        // Redirect to home page
        window.location.href = 'index.html';
    });

    // Course Details Modal
    $('.program-card .btn-outline').click(function(e) {
        e.preventDefault();
        
        var programName = $(this).closest('.program-card').find('h3').text();
        var programDesc = $(this).closest('.program-card').find('p').text();
        
        // Set modal content
        $('#course-modal-title').text(programName);
        $('#course-modal-desc').text(programDesc);
        
        // Show modal
        $('#course-modal').fadeIn();
    });

    // Close Modal
    $('.close-modal, .modal-overlay').click(function() {
        $('.modal').fadeOut();
    });

    // Prevent modal close when clicking inside modal content
    $('.modal-content').click(function(e) {
        e.stopPropagation();
    });

    // Enroll Now Button
    $('.enroll-btn').click(function() {
        $('#course-details').hide();
        $('#payment-form').show();
    });

    // Payment Form Submission
    $('#payment-form form').submit(function(e) {
        e.preventDefault();
        
        // Validate form
        var isValid = true;
        var requiredFields = ['#payment-name', '#payment-email', '#payment-phone', '#card-number', '#card-expiry', '#card-cvv'];
        
        requiredFields.forEach(function(field) {
            if (!$(field).val()) {
                isValid = false;
                $(field).addClass('error');
            } else {
                $(field).removeClass('error');
            }
        });
        
        if (isValid) {
            $(this).find('button').html('<i class="fas fa-spinner fa-spin"></i> Processing...');
            
            setTimeout(function() {
                $('#payment-form').hide();
                $('#payment-success').show();
            }, 2000);
        } else {
            alert('Please fill in all required fields');
        }
    });

    // Add CSS class for fixed header
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            header.fixed {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                animation: slideDown 0.3s forwards;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            @keyframes slideDown {
                from {
                    transform: translateY(-100%);
                }
                to {
                    transform: translateY(0);
                }
            }
            
            /* User Account Styles */
            .user-account {
                position: relative;
                display: none;
            }
            
            .user-account-toggle {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
            }
            
            .user-avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: var(--accent-color);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
            }
            
            .user-name {
                font-weight: 600;
            }
            
            .user-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                width: 200px;
                background-color: var(--bg-color);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow);
                padding: 10px 0;
                margin-top: 10px;
                display: none;
                z-index: 1000;
            }
            
            .user-dropdown.active {
                display: block;
            }
            
            .user-dropdown-item {
                padding: 10px 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: var(--transition);
            }
            
            .user-dropdown-item:hover {
                background-color: var(--bg-light);
            }
            
            .user-dropdown-item i {
                width: 20px;
            }
            
            /* Modal Styles */
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: none;
                z-index: 2000;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .modal-container {
                position: relative;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                margin: 5vh auto;
                background-color: var(--bg-color);
                border-radius: var(--border-radius-lg);
                overflow-y: auto;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-title {
                font-size: 1.5rem;
                font-weight: 700;
            }
            
            .close-modal {
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-light);
                transition: var(--transition);
            }
            
            .close-modal:hover {
                color: var(--text-dark);
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-footer {
                padding: 20px;
                border-top: 1px solid var(--border-color);
                text-align: right;
            }
            
            /* Payment Form Styles */
            .payment-section {
                margin-bottom: 30px;
            }
            
            .payment-section h3 {
                margin-bottom: 15px;
                font-size: 1.2rem;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            
            .form-group input {
                width: 100%;
                padding: 10px 15px;
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                font-size: 1rem;
            }
            
            .form-group input.error {
                border-color: var(--error-color);
            }
            
            .payment-success {
                text-align: center;
                padding: 30px 0;
            }
            
            .payment-success i {
                font-size: 4rem;
                color: var(--success-color);
                margin-bottom: 20px;
            }
            
            .payment-success h3 {
                font-size: 1.5rem;
                margin-bottom: 10px;
            }
            
            .payment-success p {
                margin-bottom: 20px;
                color: var(--text-light);
            }
            
            @media (max-width: 768px) {
                .form-row {
                    grid-template-columns: 1fr;
                }
            }
        `)
        .appendTo('head');
});

// Course Details Modal
$('.program-card .btn-outline').click(function(e) {
    e.preventDefault();
    
    var programName = $(this).closest('.program-card').find('h3').text();
    var programDesc = $(this).closest('.program-card').find('p').text();
    
    // Set modal content
    $('#course-modal-title').text(programName);
    $('#course-modal-desc').text(programDesc);
    
    // Show modal
    $('#course-modal').fadeIn();
});

// Enroll Now Button
$('.enroll-btn').click(function() {
    $('#course-details').hide();
    $('#payment-form').show();
});

// Payment Form Submission
$('#payment-form form').submit(function(e) {
    e.preventDefault();
    
    // Validate form
    var isValid = true;
    var requiredFields = ['#payment-name', '#payment-email', '#payment-phone', '#card-number', '#card-expiry', '#card-cvv'];
    
    requiredFields.forEach(function(field) {
        if (!$(field).val()) {
            isValid = false;
            $(field).addClass('error');
        } else {
            $(field).removeClass('error');
        }
    });
    
    if (isValid) {
        $(this).find('button').html('<i class="fas fa-spinner fa-spin"></i> Processing...');
        
        setTimeout(function() {
            $('#payment-form').hide();
            $('#payment-success').show();
        }, 2000);
    } else {
        alert('Please fill in all required fields');
    }
});