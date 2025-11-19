// Form handling for Blu Sky's Movie Store
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
});

function initializeForms() {
    // Inquiry Form Handling
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', handleInquirySubmit);
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleInquirySubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const inquiryType = formData.get('inquiry-type');
    const movieTitle = formData.get('movie-title');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !inquiryType || !message) {
        showResponse('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showResponse('Please enter a valid email address.', 'error');
        return;
    }
    
    // Process the inquiry (simulated)
    const response = processInquiry(inquiryType, movieTitle);
    showResponse(response, 'success');
    
    // Reset form
    e.target.reset();
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('contact-name');
    const email = formData.get('contact-email');
    const messageType = formData.get('message-type');
    const contactMessage = formData.get('contact-message');
    
    // Validation
    if (!name || !email || !messageType || !contactMessage) {
        showContactResponse('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showContactResponse('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate AJAX submission
    showContactResponse('Thank you for your message! We will get back to you within 24 hours.', 'success');
    e.target.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function processInquiry(type, movieTitle) {
    const responses = {
        'movie-availability': `Thank you for your inquiry about "${movieTitle || 'the movie'}". We'll check availability and get back to you within 24 hours.`,
        'pricing': 'Our pricing specialist will contact you with detailed pricing information.',
        'bulk-order': 'Great! Our sales team will contact you about bulk order discounts.',
        'partnership': 'Thank you for your partnership interest. Our business development team will contact you.',
        'other': 'Thank you for your message. We\'ll respond to your inquiry shortly.'
    };
    
    return responses[type] || 'Thank you for your inquiry. We\'ll get back to you soon!';
}

function showResponse(message, type) {
    const responseDiv = document.getElementById('inquiryResponse');
    if (responseDiv) {
        responseDiv.textContent = message;
        responseDiv.style.display = 'block';
        responseDiv.style.borderLeftColor = type === 'error' ? '#dc3545' : '#28a745';
        responseDiv.style.background = type === 'error' ? '#f8d7da' : '#d4edda';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            responseDiv.style.display = 'none';
        }, 5000);
    }
}

function showContactResponse(message, type) {
    const responseDiv = document.getElementById('contactResponse');
    if (responseDiv) {
        responseDiv.textContent = message;
        responseDiv.style.display = 'block';
        responseDiv.style.borderLeftColor = type === 'error' ? '#dc3545' : '#28a745';
        responseDiv.style.background = type === 'error' ? '#f8d7da' : '#d4edda';
        
        setTimeout(() => {
            responseDiv.style.display = 'none';
        }, 5000);
    }
}