$(document).ready(function() {
    // Filter Functionality
    function filterExams() {
        var ageFilter = $('#age-filter').val();
        var educationFilter = $('#education-filter').val();
        var salaryFilter = $('#salary-filter').val();
        var locationFilter = $('#location-filter').val();
        var categoryFilter = $('.category-tab.active').data('category');
        var searchQuery = $('#exam-search').val().toLowerCase();
        
        $('.exam-card').each(function() {
            var card = $(this);
            var category = card.data('category');
            var age = card.data('age');
            var education = card.data('education');
            var salary = card.data('salary');
            var location = card.data('location');
            var examTitle = card.find('h3').text().toLowerCase();
            var examDesc = card.find('p').text().toLowerCase();
            
            var showCard = true;
            
            // Category filter
            if (categoryFilter !== 'all' && category !== categoryFilter) {
                showCard = false;
            }
            
            // Age filter
            if (ageFilter && age !== ageFilter) {
                showCard = false;
            }
            
            // Education filter
            if (educationFilter && education !== educationFilter) {
                showCard = false;
            }
            
            // Salary filter
            if (salaryFilter && salary !== salaryFilter) {
                showCard = false;
            }
            
            // Location filter
            if (locationFilter && location !== locationFilter && location !== 'all') {
                showCard = false;
            }
            
            // Search query
            if (searchQuery && !examTitle.includes(searchQuery) && !examDesc.includes(searchQuery)) {
                showCard = false;
            }
            
            if (showCard) {
                card.show();
            } else {
                card.hide();
            }
        });
        
        // Show message if no results
        if ($('.exam-card:visible').length === 0) {
            if ($('.no-results').length === 0) {
                $('.exam-list').append('<div class="no-results"><p>No exams match your filters. Please try different criteria.</p></div>');
            }
        } else {
            $('.no-results').remove();
        }
    }
    
    // Apply filters on change
    $('#age-filter, #education-filter, #salary-filter, #location-filter').change(function() {
        filterExams();
    });
    
    // Search functionality
    $('#exam-search').on('input', function() {
        filterExams();
    });
    
    // Category tabs
    $('.category-tab').click(function() {
        $('.category-tab').removeClass('active');
        $(this).addClass('active');
        filterExams();
    });
    
    // Reset filters
    $('#reset-filters').click(function() {
        $('#age-filter, #education-filter, #salary-filter, #location-filter').val('');
        $('#exam-search').val('');
        $('.category-tab').removeClass('active');
        $('.category-tab[data-category="all"]').addClass('active');
        filterExams();
    });
    
    // Load More Exams (Simulation)
    $('#load-more-btn').click(function() {
        $(this).html('<i class="fas fa-spinner fa-spin"></i> Loading...');
        
        setTimeout(function() {
            // This would typically be an AJAX call to load more exams
            // For demo purposes, we'll just show a message
            $('#load-more-btn').text('No More Exams to Load');
            $('#load-more-btn').prop('disabled', true);
        }, 2000);
    });

    // Add CSS for no results message
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .no-results {
                text-align: center;
                padding: 40px 0;
                width: 100%;
            }
            
            .no-results p {
                font-size: 1.1rem;
                color: #666;
            }
        `)
        .appendTo('head');
});