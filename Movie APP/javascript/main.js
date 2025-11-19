//  Working JavaScript for Blu Sky's Movie Store
document.addEventListener('DOMContentLoaded', function() {
    console.log('Blu Sky\'s Movie Store loaded!');
    
    initializeSite();
    initializeSearch();
    initializeMovieInteractions();
});

function initializeSite() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '1';
    });
}


function initializeSearch() {
    const searchInput = document.getElementById('movieSearch');
    
    if (searchInput) {
        console.log('Search input found!');
        
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const movieItems = document.querySelectorAll('.movie-item');
            
            console.log('Searching for:', searchTerm);
            
            movieItems.forEach(item => {
                const img = item.querySelector('img');
                const altText = img.alt.toLowerCase();
                const dataTitle = item.getAttribute('data-title').toLowerCase();
                
                if (searchTerm === '' || altText.includes(searchTerm) || dataTitle.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    } else {
        console.log('Search input not found!');
    }
}

// MOVIE INTERACTIONS
function initializeMovieInteractions() {
    // Make gallery images clickable for lightbox
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
    
    // Add hover effects to all movie images
    const allMovieImages = document.querySelectorAll('.movie-card img, .gallery-grid img');
    allMovieImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

//  LIGHTBOX FUNCTION
function openLightbox(src, alt) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create new lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    lightbox.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%; text-align: center;">
            <span class="close-lightbox" style="position: absolute; top: -40px; right: 0; color: white; font-size: 30px; cursor: pointer; background: rgba(0,0,0,0.5); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</span>
            <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 80vh; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="color: white; margin-top: 15px; font-size: 18px; font-weight: bold;">${alt}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
        lightbox.remove();
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function closeLightbox(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
            document.removeEventListener('keydown', closeLightbox);
        }
    });
}

// MOVIE DETAILS FUNCTION
function showMovieDetails(title, genre, price) {
    // Remove existing modal
    const existingModal = document.querySelector('.movie-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'movie-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
    `;
    // MOVIE DETAILS FUNCTION FOR HOMEPAGE
function showMovieDetails(title, genre, price, description = '') {
    // Remove existing modal if any
    const existingModal = document.querySelector('.movie-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'movie-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 20px; max-width: 400px; width: 90%; text-align: center; position: relative;">
            <span class="close-modal" style="position: absolute; top: 15px; right: 15px; font-size: 30px; cursor: pointer; color: #333;">×</span>
            <h3 style="color: #007bff; margin-bottom: 15px;">${title}</h3>
            <p style="color: #666; margin-bottom: 10px;"><strong>Genre:</strong> ${genre}</p>
            <p style="color: #28a745; font-size: 24px; font-weight: bold; margin-bottom: 15px;">${price}</p>
            ${description ? `<p style="color: #333; margin-bottom: 20px; line-height: 1.5;">${description}</p>` : ''}
            <button onclick="addToCart('${title}')" style="background: #28a745; color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 16px; margin: 5px;">Add to Cart</button>
            <button onclick="closeMovieModal()" style="background: #6c757d; color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 16px; margin: 5px;">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    modal.querySelector('.close-modal').addEventListener('click', closeMovieModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeMovieModal();
        }
    });
}

function closeMovieModal() {
    const modal = document.querySelector('.movie-modal');
    if (modal) {
        modal.remove();
    }
}

function addToCart(movieTitle) {
    alert(`🎬 Added "${movieTitle}" to your cart!`);
    closeMovieModal();
}
    
    modal.innerHTML = `
        <div class="modal-content" style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; width: 90%; text-align: center; position: relative;">
            <span class="close-modal" style="position: absolute; top: 15px; right: 15px; font-size: 30px; cursor: pointer; color: #333;">×</span>
            <h3 style="color: #007bff; margin-bottom: 15px;">${title}</h3>
            <p style="color: #666; margin-bottom: 10px;"><strong>Genre:</strong> ${genre}</p>
            <p style="color: #28a745; font-size: 24px; font-weight: bold; margin-bottom: 20px;">${price}</p>
            <button onclick="addToCart('${title}')" style="background: #28a745; color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 16px; margin: 5px;">Add to Cart</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #6c757d; color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 16px; margin: 5px;">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function addToCart(movieTitle) {
    alert(`🎬 ${movieTitle} added to cart!`);
    // Close the modal
    document.querySelector('.movie-modal').remove();
}

// Add simple fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .movie-item, .movie-card {
        animation: fadeIn 0.6s ease;
    }
    
    /* Make sure search bar is visible */
    #movieSearch {
        border: 2px solid #007bff !important;
        padding: 12px 20px !important;
        border-radius: 25px !important;
        font-size: 16px !important;
        width: 100% !important;
        max-width: 500px !important;
        margin: 20px auto !important;
        display: block !important;
    }
        // Contact page interactive functions
function callUs() {
    alert('📞 Calling Blu Sky\'s Movie Store...\n+27 12 345 6789\n+27 68 798 4107');
}

function emailUs() {
    alert('📧 Email us at:\nsupport@bluskymoviestore.com\n\nWe\'ll respond within 24 hours!');
}

function showHours() {
    alert('🕒 Our Business Hours:\n\n📅 Monday - Friday: 9:00 AM - 6:00 PM\n📅 Saturday: 10:00 AM - 4:00 PM\n📅 Sunday: 10:00 AM - 4:00 PM\n\n🎬 We look forward to helping you find your next favorite movie!');
}

function getDirections() {
    alert('📍 Getting directions to Blu Sky\'s Movie Store...\n\n📍 Address: 45 Cinema Road, Braamfontein, Johannesburg\n\nUse the map above for navigation!');
}

`;
document.head.appendChild(style);