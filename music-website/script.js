// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Audio player functionality
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    
    audioPlayers.forEach(player => {
        // Add custom styling to audio players
        player.style.width = '100%';
        player.style.height = '40px';
        player.style.borderRadius = '20px';
        player.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        
        // Prevent multiple audio from playing simultaneously
        player.addEventListener('play', function() {
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !service || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#45b7d1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Beat purchase functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-small') && e.target.textContent === 'Purchase') {
        const beatCard = e.target.closest('.beat-card');
        const beatTitle = beatCard.querySelector('h3').textContent;
        const beatPrice = beatCard.querySelector('.price').textContent;
        
        // Simulate purchase process
        showNotification(`Added "${beatTitle}" to cart for ${beatPrice}`, 'success');
        
        // Here you would integrate with your payment processor
        // For now, we'll just show a success message
    }
});

// Service quote functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') && e.target.textContent === 'Get Quote') {
        const serviceCard = e.target.closest('.service-card');
        const serviceTitle = serviceCard.querySelector('h3').textContent;
        
        // Scroll to contact form
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Pre-fill the service dropdown
        setTimeout(() => {
            const serviceSelect = document.querySelector('#service');
            if (serviceSelect) {
                const serviceMap = {
                    'Custom Beat Production': 'custom-beat',
                    'Mixing & Mastering': 'mixing',
                    'Full Song Production': 'full-production'
                };
                
                const serviceValue = serviceMap[serviceTitle];
                if (serviceValue) {
                    serviceSelect.value = serviceValue;
                }
            }
        }, 500);
        
        showNotification(`Interested in ${serviceTitle}? Please fill out the contact form below.`, 'info');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.beat-card, .service-card, .about-text, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Music visualizer animation enhancement
function enhanceVisualizer() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        // Add random height variations
        setInterval(() => {
            const randomHeight = Math.random() * 200 + 20;
            bar.style.height = randomHeight + 'px';
        }, 100 + (index * 50));
    });
}

// Initialize visualizer when page loads
document.addEventListener('DOMContentLoaded', enhanceVisualizer);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Load custom hero image if available
    loadCustomHeroImage();
});

// Load custom hero image from admin settings
function loadCustomHeroImage() {
    const heroData = getHeroImageData();
    if (heroData && heroData.imageData) {
        const heroSection = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        // Update hero title and subtitle if custom ones are provided
        if (heroData.title) {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) heroTitle.textContent = heroData.title;
        }
        
        if (heroData.subtitle) {
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) heroSubtitle.textContent = heroData.subtitle;
        }
        
        // Replace the music visualizer with the custom image
        if (heroVisual) {
            heroVisual.innerHTML = `
                <div class="custom-hero-image">
                    <img src="${heroData.imageData}" alt="Hero Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
                </div>
            `;
        }
        
        // Add overlay effect to hero section
        heroSection.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${heroData.imageData}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.backgroundAttachment = 'fixed';
    }
}

// Get hero image data from localStorage
function getHeroImageData() {
    const data = localStorage.getItem('prodcupid_admin_data');
    return data ? JSON.parse(data).heroImage || null : null;
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add hover effects for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to beat cards
    const beatCards = document.querySelectorAll('.beat-card');
    beatCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Secret Admin Access - Click logo 5 times to access admin panel
let logoClickCount = 0;
let logoClickTimeout;

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            logoClickCount++;
            
            // Clear timeout if user stops clicking
            clearTimeout(logoClickTimeout);
            
            // Reset counter after 3 seconds of no clicks
            logoClickTimeout = setTimeout(() => {
                logoClickCount = 0;
            }, 3000);
            
            // If clicked 5 times, redirect to admin
            if (logoClickCount >= 5) {
                logoClickCount = 0;
                showAdminAccess();
            }
        });
    }
});

function showAdminAccess() {
    // Create admin access modal
    const modal = document.createElement('div');
    modal.className = 'admin-access-modal';
    modal.innerHTML = `
        <div class="admin-access-content">
            <div class="admin-access-header">
                <i class="fas fa-lock"></i>
                <h3>Admin Access</h3>
            </div>
            <p>Enter admin credentials to access the management panel:</p>
            <form id="admin-access-form">
                <div class="form-group">
                    <input type="text" id="admin-username" placeholder="Username" required>
                </div>
                <div class="form-group">
                    <input type="password" id="admin-password" placeholder="Password" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Access Admin</button>
                    <button type="button" class="btn btn-secondary" onclick="closeAdminModal()">Cancel</button>
                </div>
            </form>
            <div id="admin-access-error" class="error-message"></div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('admin-access-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        const errorDiv = document.getElementById('admin-access-error');
        
        if (username === 'prodcupid' && password === 'cupid2024') {
            window.location.href = 'admin.html';
        } else {
            errorDiv.textContent = 'Invalid credentials';
        }
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAdminModal();
        }
    });
}

function closeAdminModal() {
    const modal = document.querySelector('.admin-access-modal');
    if (modal) {
        modal.remove();
    }
}

// Add admin access modal styles
const adminModalStyles = `
    .admin-access-content {
        background: rgba(0, 0, 0, 0.9);
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid #FF0000;
        max-width: 400px;
        width: 90%;
        text-align: center;
    }
    
    .admin-access-header {
        margin-bottom: 1.5rem;
    }
    
    .admin-access-header i {
        font-size: 2rem;
        color: #FF0000;
        margin-bottom: 0.5rem;
    }
    
    .admin-access-header h3 {
        color: #FF0000;
        margin-bottom: 0;
    }
    
    .admin-access-content p {
        color: #ccc;
        margin-bottom: 1.5rem;
    }
    
    .admin-access-content .form-group {
        margin-bottom: 1rem;
    }
    
    .admin-access-content input {
        width: 100%;
        padding: 1rem;
        border: 2px solid #8B0000;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 1rem;
        transition: all 0.3s ease;
    }
    
    .admin-access-content input:focus {
        outline: none;
        border-color: #FF0000;
        box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.2);
    }
    
    .admin-access-content input::placeholder {
        color: #999;
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
    }
    
    .error-message {
        color: #FF0000;
        margin-top: 1rem;
        font-weight: 500;
    }
`;

// Inject admin modal styles
const adminStyleSheet = document.createElement('style');
adminStyleSheet.textContent = adminModalStyles;
document.head.appendChild(adminStyleSheet);
