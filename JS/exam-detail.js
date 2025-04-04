$(document).ready(function() {
    // Get exam ID from URL parameter
    var urlParams = new URLSearchParams(window.location.search);
    var examId = urlParams.get('exam');
    
    // Load exam data based on ID
    loadExamData(examId);
    
    // Tab Functionality
    $('.tab-btn').click(function() {
        var tabId = $(this).data('tab');
        
        // Update active tab button
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // Show selected tab content
        $('.tab-pane').removeClass('active');
        $('#' + tabId + '-tab').addClass('active');
    });
    
    // Training Form Submission
    $('#training-form').submit(function(e) {
        e.preventDefault();
        
        // Validate form
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var program = $('#program').val();
        
        if (!name || !email || !phone || !program) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Simulate form submission
        $(this).find('button').html('<i class="fas fa-spinner fa-spin"></i> Submitting...');
        
        setTimeout(function() {
            $('#training-form').html('<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you for your interest! Our team will contact you shortly with more information about the program.</p></div>');
        }, 2000);
    });
    
    // Exam Data Loading Function
    function loadExamData(examId) {
        // In a real application, this would be an AJAX call to fetch exam data
        // For demo purposes, we'll use a switch statement with predefined data
        
        var examData;
        
        switch(examId) {
            case 'upsc-cse':
                examData = {
                    title: 'UPSC Civil Services Examination',
                    category: 'central',
                    description: 'The Civil Services Examination (CSE) is a nationwide competitive examination in India conducted by the Union Public Service Commission for recruitment to various Civil Services of the Government of India, including the Indian Administrative Service (IAS), Indian Foreign Service (IFS), Indian Police Service (IPS), among others. It is conducted in three phases - a preliminary examination consisting of two objective-type papers, a main examination consisting of nine papers of conventional essay type, and a personality test (interview).',
                    qualification: 'Graduate from any recognized university',
                    age: '21-32 years (with relaxation for reserved categories)',
                    salary: '₹56,100 - ₹2,50,000 (Level 10-18)',
                    pattern: 'Preliminary, Mains, and Interview',
                    dates: {
                        notification: 'February 2023',
                        applicationStart: 'February 2023',
                        applicationEnd: 'March 2023',
                        prelims: 'May 2023',
                        mains: 'September 2023',
                        interview: 'January-February 2024'
                    },
                    officialLinks: {
                        website: 'https://www.upsc.gov.in/',
                        notification: '#',
                        apply: '#'
                    }
                };
                break;
                
            case 'ssc-cgl':
                examData = {
                    title: 'SSC Combined Graduate Level Examination',
                    category: 'central',
                    description: 'The Combined Graduate Level Examination is conducted by the Staff Selection Commission for various Group B and Group C posts in different Ministries, Departments and Organizations of the Government of India.',
                    qualification: 'Graduate from any recognized university',
                    age: '18-30 years (with relaxation for reserved categories)',
                    salary: '₹35,400 - ₹1,12,400 (Level 7-8)',
                    pattern: 'Tier I, Tier II, Tier III, and Skill Test/Computer Proficiency Test',
                    dates: {
                        notification: 'December 2022',
                        applicationStart: 'December 2022',
                        applicationEnd: 'January 2023',
                        tierI: 'April 2023',
                        tierII: 'August 2023',
                        tierIII: 'November 2023'
                    },
                    officialLinks: {
                        website: 'https://ssc.nic.in/',
                        notification: '#',
                        apply: '#'
                    }
                };
                break;
                
            case 'ibps-po':
                examData = {
                    title: 'IBPS Probationary Officer Examination',
                    category: 'banking',
                    description: 'The Institute of Banking Personnel Selection conducts this exam to recruit Probationary Officers for various public sector banks in India.',
                    qualification: 'Graduate from any recognized university',
                    age: '20-30 years (with relaxation for reserved categories)',
                    salary: '₹40,000 - ₹70,000',
                    pattern: 'Preliminary, Mains, and Interview',
                    dates: {
                        notification: 'August 2023',
                        applicationStart: 'August 2023',
                        applicationEnd: 'September 2023',
                        prelims: 'October 2023',
                        mains: 'November 2023',
                        interview: 'January 2024'
                    },
                    officialLinks: {
                        website: 'https://www.ibps.in/',
                        notification: '#',
                        apply: '#'
                    }
                };
                break;
                
            default:
                // Default data if exam ID is not recognized
                examData = {
                    title: 'UPSC Civil Services Examination',
                    category: 'central',
                    description: 'The Civil Services Examination (CSE) is a nationwide competitive examination in India conducted by the Union Public Service Commission for recruitment to various Civil Services of the Government of India.',
                    qualification: 'Graduate from any recognized university',
                    age: '21-32 years (with relaxation for reserved categories)',
                    salary: '₹56,100 - ₹2,50,000 (Level 10-18)',
                    pattern: 'Preliminary, Mains, and Interview',
                    dates: {
                        notification: 'February 2023',
                        applicationStart: 'February 2023',
                        applicationEnd: 'March 2023',
                        prelims: 'May 2023',
                        mains: 'September 2023',
                        interview: 'January-February 2024'
                    },
                    officialLinks: {
                        website: 'https://www.upsc.gov.in/',
                        notification: '#',
                        apply: '#'
                    }
                };
        }
        
        // Update page with exam data
        updateExamPage(examData);
    }
    
    // Update Page with Exam Data
    function updateExamPage(data) {
        // Update breadcrumb
        $('#exam-breadcrumb').text(data.title);
        
        // Update page title
        document.title = data.title + ' - Government Exam Academy';
        
        // Update exam details
        $('#exam-title').text(data.title);
        $('#exam-tag').text(data.category.charAt(0).toUpperCase() + data.category.slice(1));
        $('#exam-tag').attr('class', 'exam-tag ' + data.category);
        
        $('#exam-description').text(data.description);
        $('#exam-qualification').text(data.qualification);
        $('#exam-age').text(data.age);
        $('#exam-salary').text(data.salary);
        $('#exam-pattern').text(data.pattern);
        
        // Update dates
        $('#notification-date').text(data.dates.notification);
        $('#application-start').text(data.dates.applicationStart);
        $('#application-end').text(data.dates.applicationEnd);
        $('#prelims-date').text(data.dates.prelims);
        $('#mains-date').text(data.dates.mains);
        $('#interview-date').text(data.dates.interview);
        
        // Update official links
        $('#official-website').attr('href', data.officialLinks.website);
        $('#notification-link').attr('href', data.officialLinks.notification);
        $('#apply-link').attr('href', data.officialLinks.apply);
    }

    // Add CSS for success message
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .success-message {
                text-align: center;
                padding: 30px 0;
            }
            
            .success-message i {
                font-size: 3rem;
                color: #28a745;
                margin-bottom: 15px;
            }
            
            .success-message p {
                font-size: 1.1rem;
                color: #333;
            }
        `)
        .appendTo('head');
});