// Admin Panel JavaScript

// Configuration
const ADMIN_CONFIG = {
    username: 'prodcupid',
    password: 'cupid2024',
    storageKey: 'prodcupid_admin_data'
};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    // Check if already logged in
    if (localStorage.getItem('prodcupid_admin_logged_in') === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    loadDashboardData();
}

function setupEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Navigation links
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            updateActiveNav(this);
        });
    });
    
    // Beat management
    document.getElementById('add-beat-btn').addEventListener('click', showBeatForm);
    document.getElementById('cancel-beat-btn').addEventListener('click', hideBeatForm);
    document.getElementById('beat-form').addEventListener('submit', handleBeatSubmit);
    
    // Search functionality
    document.getElementById('beat-search').addEventListener('input', filterBeats);
    
    // Order filters
    document.getElementById('order-status-filter').addEventListener('change', filterOrders);
    
    // Settings functionality
    document.getElementById('hero-image-form').addEventListener('submit', handleHeroImageUpload);
    document.getElementById('remove-hero-image').addEventListener('click', removeHeroImage);
    document.getElementById('site-info-form').addEventListener('submit', handleSiteInfoSave);
    document.getElementById('hero-image-upload').addEventListener('change', previewHeroImage);
    
    // AI Title Generator functionality
    document.getElementById('ai-title-generator').addEventListener('click', generateAITitles);
    document.getElementById('close-ai-suggestions').addEventListener('click', closeAISuggestions);
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
        localStorage.setItem('prodcupid_admin_logged_in', 'true');
        showDashboard();
        errorDiv.textContent = '';
    } else {
        errorDiv.textContent = 'Invalid username or password';
    }
}

function handleLogout() {
    localStorage.removeItem('prodcupid_admin_logged_in');
    showLogin();
}

function showLogin() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadDashboardData();
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Load section-specific data
    switch(sectionName) {
        case 'beats':
            loadBeats();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function updateActiveNav(activeLink) {
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Dashboard Functions
function loadDashboardData() {
    const beats = getBeats();
    const orders = getOrders();
    
    // Update stats
    document.getElementById('total-beats').textContent = beats.length;
    document.getElementById('total-orders').textContent = orders.length;
    
    // Calculate revenue
    const totalRevenue = orders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.total, 0);
    document.getElementById('total-revenue').textContent = '$' + totalRevenue.toFixed(2);
    
    // Calculate unique customers
    const uniqueCustomers = new Set(orders.map(order => order.email)).size;
    document.getElementById('total-customers').textContent = uniqueCustomers;
}

// Beat Management Functions
function showBeatForm() {
    document.getElementById('beat-form-container').style.display = 'block';
    document.getElementById('form-title').textContent = 'Add New Beat';
    document.getElementById('beat-form').reset();
    document.getElementById('beat-form').dataset.editId = '';
}

function hideBeatForm() {
    document.getElementById('beat-form-container').style.display = 'none';
}

function handleBeatSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const beatData = {
        id: Date.now().toString(),
        title: formData.get('title'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
        genre: formData.get('genre'),
        bpm: parseInt(formData.get('bpm')) || null,
        audioFile: formData.get('audio').name,
        coverFile: formData.get('cover').name || null,
        dateAdded: new Date().toISOString(),
        sales: 0
    };
    
    // Handle file uploads (simplified - in real app, upload to server)
    const audioFile = formData.get('audio');
    const coverFile = formData.get('cover');
    
    if (audioFile && audioFile.size > 0) {
        // In a real application, you would upload this to a server
        console.log('Audio file:', audioFile.name, audioFile.size);
    }
    
    if (coverFile && coverFile.size > 0) {
        // In a real application, you would upload this to a server
        console.log('Cover file:', coverFile.name, coverFile.size);
    }
    
    // Save beat
    const beats = getBeats();
    beats.push(beatData);
    saveBeats(beats);
    
    // Refresh beats list
    loadBeats();
    hideBeatForm();
    
    // Show success message
    showNotification('Beat added successfully!', 'success');
}

function loadBeats() {
    const beats = getBeats();
    const beatsGrid = document.getElementById('beats-grid');
    
    if (beats.length === 0) {
        beatsGrid.innerHTML = '<p style="color: #ccc; text-align: center; grid-column: 1/-1;">No beats found. Add your first beat!</p>';
        return;
    }
    
    beatsGrid.innerHTML = beats.map(beat => `
        <div class="beat-card-admin">
            <div class="beat-cover-admin">
                ${beat.coverFile ? 
                    `<img src="data:image/jpeg;base64,${beat.coverFile}" alt="${beat.title}">` : 
                    '<i class="fas fa-music"></i>'
                }
            </div>
            <div class="beat-info-admin">
                <h4>${beat.title}</h4>
                <p>${beat.description}</p>
                <div class="beat-meta">
                    <span class="beat-price-admin">$${beat.price.toFixed(2)}</span>
                    <span class="beat-genre-admin">${beat.genre}</span>
                </div>
                <div class="beat-actions">
                    <button class="btn-small btn-edit" onclick="editBeat('${beat.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteBeat('${beat.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function editBeat(beatId) {
    const beats = getBeats();
    const beat = beats.find(b => b.id === beatId);
    
    if (!beat) return;
    
    // Populate form with beat data
    document.getElementById('beat-title').value = beat.title;
    document.getElementById('beat-price').value = beat.price;
    document.getElementById('beat-description').value = beat.description;
    document.getElementById('beat-genre').value = beat.genre;
    document.getElementById('beat-bpm').value = beat.bpm || '';
    
    // Show form
    document.getElementById('beat-form-container').style.display = 'block';
    document.getElementById('form-title').textContent = 'Edit Beat';
    document.getElementById('beat-form').dataset.editId = beatId;
}

function deleteBeat(beatId) {
    if (confirm('Are you sure you want to delete this beat?')) {
        const beats = getBeats();
        const updatedBeats = beats.filter(b => b.id !== beatId);
        saveBeats(updatedBeats);
        loadBeats();
        showNotification('Beat deleted successfully!', 'success');
    }
}

function filterBeats() {
    const searchTerm = document.getElementById('beat-search').value.toLowerCase();
    const beatCards = document.querySelectorAll('.beat-card-admin');
    
    beatCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Order Management Functions
function loadOrders() {
    const orders = getOrders();
    const ordersList = document.getElementById('orders-list');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p style="color: #ccc; text-align: center;">No orders found.</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-status status-${order.status}">${order.status}</span>
            </div>
            <div class="order-details">
                <div class="order-detail">
                    <strong>Customer:</strong> ${order.customerName}
                </div>
                <div class="order-detail">
                    <strong>Email:</strong> ${order.email}
                </div>
                <div class="order-detail">
                    <strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}
                </div>
                <div class="order-detail">
                    <strong>Total:</strong> $${order.total.toFixed(2)}
                </div>
            </div>
            <div class="order-items">
                <strong>Items:</strong>
                <ul>
                    ${order.items.map(item => `<li>${item.title} - $${item.price.toFixed(2)}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function filterOrders() {
    const statusFilter = document.getElementById('order-status-filter').value;
    const orderCards = document.querySelectorAll('.order-card');
    
    orderCards.forEach(card => {
        const orderStatus = card.querySelector('.order-status').textContent.toLowerCase();
        
        if (!statusFilter || orderStatus === statusFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Analytics Functions
function loadAnalytics() {
    loadTopBeats();
}

function loadTopBeats() {
    const beats = getBeats();
    const topBeatsList = document.getElementById('top-beats-list');
    
    // Sort beats by sales
    const topBeats = beats
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);
    
    if (topBeats.length === 0) {
        topBeatsList.innerHTML = '<p style="color: #ccc; text-align: center;">No sales data available.</p>';
        return;
    }
    
    topBeatsList.innerHTML = topBeats.map(beat => `
        <div class="top-beat-item">
            <span class="top-beat-name">${beat.title}</span>
            <span class="top-beat-sales">${beat.sales} sales</span>
        </div>
    `).join('');
}

// Data Management Functions
function getBeats() {
    const data = localStorage.getItem(ADMIN_CONFIG.storageKey);
    return data ? JSON.parse(data).beats || [] : [];
}

function saveBeats(beats) {
    const data = JSON.parse(localStorage.getItem(ADMIN_CONFIG.storageKey) || '{}');
    data.beats = beats;
    localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(data));
}

function getOrders() {
    const data = localStorage.getItem(ADMIN_CONFIG.storageKey);
    return data ? JSON.parse(data).orders || [] : [];
}

function saveOrders(orders) {
    const data = JSON.parse(localStorage.getItem(ADMIN_CONFIG.storageKey) || '{}');
    data.orders = orders;
    localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(data));
}

// Utility Functions
function showNotification(message, type = 'info') {
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
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
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

// Initialize with sample data if empty
function initializeSampleData() {
    const data = localStorage.getItem(ADMIN_CONFIG.storageKey);
    if (!data) {
        const sampleData = {
            beats: [
                {
                    id: '1',
                    title: 'Love Trap Beat',
                    price: 29.99,
                    description: 'Romantic trap instrumental with emotional depth',
                    genre: 'Trap',
                    bpm: 140,
                    audioFile: 'love-trap.mp3',
                    coverFile: null,
                    dateAdded: new Date().toISOString(),
                    sales: 5
                },
                {
                    id: '2',
                    title: 'Romantic Lo-Fi',
                    price: 24.99,
                    description: 'Dreamy lo-fi beat perfect for love songs',
                    genre: 'Lo-Fi',
                    bpm: 85,
                    audioFile: 'romantic-lofi.mp3',
                    coverFile: null,
                    dateAdded: new Date().toISOString(),
                    sales: 3
                }
            ],
            orders: [
                {
                    id: 'ORD001',
                    customerName: 'John Doe',
                    email: 'john@example.com',
                    date: new Date().toISOString(),
                    status: 'completed',
                    total: 29.99,
                    items: [
                        { title: 'Love Trap Beat', price: 29.99 }
                    ]
                }
            ]
        };
        localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(sampleData));
    }
}

// Initialize sample data on first load
initializeSampleData();

// Settings Functions
function loadSettings() {
    loadHeroImagePreview();
    loadSiteInfo();
}

function loadHeroImagePreview() {
    const heroData = getHeroImageData();
    const previewContainer = document.getElementById('current-hero-preview');
    
    if (heroData && heroData.imageData) {
        previewContainer.innerHTML = `
            <img src="${heroData.imageData}" alt="Hero Image" style="width: 100%; height: 100%; object-fit: cover;">
        `;
    } else {
        previewContainer.innerHTML = `
            <div class="hero-preview-placeholder">
                <i class="fas fa-image"></i>
                <p>No hero image uploaded</p>
            </div>
        `;
    }
}

function loadSiteInfo() {
    const siteInfo = getSiteInfo();
    if (siteInfo) {
        document.getElementById('site-name').value = siteInfo.siteName || 'Prod.Cupid';
        document.getElementById('site-tagline').value = siteInfo.siteTagline || 'Premium Beats & Music Services';
        document.getElementById('contact-email').value = siteInfo.contactEmail || 'contact@prodcupid.com';
        document.getElementById('contact-location').value = siteInfo.contactLocation || 'Los Angeles, CA';
    }
}

function previewHeroImage(e) {
    const file = e.target.files[0];
    if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File size must be less than 5MB', 'error');
            e.target.value = '';
            return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('Please select a valid image file', 'error');
            e.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewContainer = document.getElementById('current-hero-preview');
            previewContainer.innerHTML = `
                <img src="${e.target.result}" alt="Hero Image Preview" style="width: 100%; height: 100%; object-fit: cover;">
            `;
        };
        reader.readAsDataURL(file);
    }
}

function handleHeroImageUpload(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const file = formData.get('heroImage');
    const title = formData.get('heroTitle');
    const subtitle = formData.get('heroSubtitle');
    
    if (!file || file.size === 0) {
        showNotification('Please select an image file', 'error');
        return;
    }
    
    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        return;
    }
    
    // Convert image to base64 for storage
    const reader = new FileReader();
    reader.onload = function(e) {
        const heroData = {
            imageData: e.target.result,
            title: title || 'Prod.Cupid Beats & Music Production',
            subtitle: subtitle || 'Love-inspired beats and professional music services that make hearts skip a beat',
            uploadedAt: new Date().toISOString()
        };
        
        // Save hero image data
        saveHeroImageData(heroData);
        
        // Update preview
        loadHeroImagePreview();
        
        // Clear form
        e.target.reset();
        
        showNotification('Hero image uploaded successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

function removeHeroImage() {
    if (confirm('Are you sure you want to remove the current hero image?')) {
        removeHeroImageData();
        loadHeroImagePreview();
        showNotification('Hero image removed successfully!', 'success');
    }
}

function handleSiteInfoSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const siteInfo = {
        siteName: formData.get('siteName'),
        siteTagline: formData.get('siteTagline'),
        contactEmail: formData.get('contactEmail'),
        contactLocation: formData.get('contactLocation'),
        updatedAt: new Date().toISOString()
    };
    
    saveSiteInfo(siteInfo);
    showNotification('Site information saved successfully!', 'success');
}

// Data management functions for settings
function getHeroImageData() {
    const data = localStorage.getItem(ADMIN_CONFIG.storageKey);
    return data ? JSON.parse(data).heroImage || null : null;
}

function saveHeroImageData(heroData) {
    const data = JSON.parse(localStorage.getItem(ADMIN_CONFIG.storageKey) || '{}');
    data.heroImage = heroData;
    localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(data));
}

function removeHeroImageData() {
    const data = JSON.parse(localStorage.getItem(ADMIN_CONFIG.storageKey) || '{}');
    delete data.heroImage;
    localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(data));
}

function getSiteInfo() {
    const data = localStorage.getItem(ADMIN_CONFIG.storageKey);
    return data ? JSON.parse(data).siteInfo || null : null;
}

function saveSiteInfo(siteInfo) {
    const data = JSON.parse(localStorage.getItem(ADMIN_CONFIG.storageKey) || '{}');
    data.siteInfo = siteInfo;
    localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(data));
}

// AI Title Generator Functions
async function generateAITitles() {
    const genre = document.getElementById('beat-genre').value;
    const bpm = document.getElementById('beat-bpm').value;
    const description = document.getElementById('beat-description').value;
    
    // Show loading state
    showAILoading();
    
    try {
        // Get AI suggestions (using a fallback system for demo)
        const suggestions = await getAITitleSuggestions(genre, bpm, description);
        displayAISuggestions(suggestions);
    } catch (error) {
        console.error('AI Title generation error:', error);
        // Fallback to local title generation
        const fallbackSuggestions = generateFallbackTitles(genre, bpm, description);
        displayAISuggestions(fallbackSuggestions);
    }
}

async function getAITitleSuggestions(genre, bpm, description) {
    // Call Netlify function (secure server-side OpenAI)
    try {
        const res = await fetch('/api/openai-titles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ genre, bpm, description })
        });
        if (!res.ok) throw new Error('AI service unavailable');
        const data = await res.json();
        const titles = (data.titles || []).slice(0, 8);
        if (titles.length === 0) throw new Error('No AI titles');
        return titles.map((t) => ({ title: t, confidence: 0.9 }));
    } catch (error) {
        console.error('AI Title generation error:', error);
        // Fallback to local generation
        return generateIntelligentTitles(genre, bpm, description);
    }
}

function createTitlePrompt(genre, bpm, description) {
    let prompt = `Generate ${CONFIG.AI_TITLES.MAX_SUGGESTIONS} creative beat titles for a ${genre || 'music'} instrumental`;
    
    if (bpm) {
        prompt += ` with ${bpm} BPM`;
    }
    
    if (description) {
        prompt += `. Description: "${description}"`;
    }
    
    prompt += `. Requirements:
- Make titles catchy and marketable
- Use genre-appropriate terminology
- Keep titles under 30 characters
- Include emotional or atmospheric elements
- Make them appealing to artists and music buyers
- Format as a simple list, one title per line
- Don't include numbers or bullet points`;
    
    return prompt;
}

function generateIntelligentTitles(genre, bpm, description) {
    const baseTitles = [];
    
    // Genre-based title patterns
    const genrePatterns = {
        'Trap': ['Dark Trap', 'Melodic Trap', 'Emotional Trap', 'Hard Trap', 'Sad Trap', 'Love Trap', 'Street Trap', 'Dreamy Trap'],
        'Hip-Hop': ['Boom Bap', 'Old School', 'Modern Hip-Hop', 'Underground', 'Commercial', 'Freestyle', 'Battle Rap', 'Storytelling'],
        'R&B': ['Smooth R&B', 'Modern R&B', 'Classic R&B', 'Neo-Soul', 'Contemporary', 'Emotional R&B', 'Love R&B', 'Soulful'],
        'Pop': ['Pop Anthem', 'Radio Pop', 'Indie Pop', 'Electronic Pop', 'Acoustic Pop', 'Dance Pop', 'Ballad Pop', 'Upbeat Pop'],
        'Lo-Fi': ['Chill Lo-Fi', 'Study Lo-Fi', 'Rainy Day', 'Coffee Shop', 'Late Night', 'Relaxing', 'Ambient', 'Dreamy'],
        'Drill': ['UK Drill', 'NY Drill', 'Dark Drill', 'Melodic Drill', 'Aggressive Drill', 'Street Drill', 'Hard Drill', 'Emotional Drill'],
        'Afrobeat': ['Afrobeat Fusion', 'Modern Afrobeat', 'Traditional', 'Afro-Pop', 'Afro-House', 'Afro-Trap', 'Afro-Soul', 'Afro-Dance']
    };
    
    // BPM-based modifiers
    const bpmModifiers = {
        slow: ['Slow', 'Chill', 'Relaxed', 'Mellow', 'Smooth'],
        medium: ['Mid-Tempo', 'Groove', 'Steady', 'Balanced', 'Flow'],
        fast: ['Fast', 'Upbeat', 'Energetic', 'High-Energy', 'Intense']
    };
    
    // Emotional/mood keywords
    const moodKeywords = ['Love', 'Heartbreak', 'Dreams', 'Night', 'Sunset', 'Rain', 'Fire', 'Ice', 'Gold', 'Silver', 'Diamond', 'Crystal'];
    
    // Generate titles based on genre
    if (genre && genrePatterns[genre]) {
        const genreTitles = genrePatterns[genre];
        baseTitles.push(...genreTitles.slice(0, 3));
    }
    
    // Add BPM-based titles
    if (bpm) {
        const bpmNum = parseInt(bpm);
        let bpmCategory = 'medium';
        if (bpmNum < 100) bpmCategory = 'slow';
        else if (bpmNum > 140) bpmCategory = 'fast';
        
        const modifiers = bpmModifiers[bpmCategory];
        modifiers.forEach(modifier => {
            baseTitles.push(`${modifier} ${genre || 'Beat'}`);
        });
    }
    
    // Add mood-based titles
    moodKeywords.forEach(mood => {
        baseTitles.push(`${mood} ${genre || 'Beat'}`);
        baseTitles.push(`${genre || 'Beat'} of ${mood}`);
    });
    
    // Add description-based titles if available
    if (description) {
        const words = description.toLowerCase().split(' ');
        const keyWords = words.filter(word => 
            word.length > 3 && 
            !['the', 'and', 'for', 'with', 'that', 'this', 'beat', 'instrumental'].includes(word)
        );
        
        keyWords.forEach(word => {
            baseTitles.push(`${word.charAt(0).toUpperCase() + word.slice(1)} ${genre || 'Beat'}`);
        });
    }
    
    // Remove duplicates and return unique suggestions
    const uniqueTitles = [...new Set(baseTitles)];
    return uniqueTitles.slice(0, 8).map(title => ({
        title: title,
        confidence: Math.random() * 0.3 + 0.7 // Simulate AI confidence scores
    }));
}

function generateFallbackTitles(genre, bpm, description) {
    // Simple fallback system
    const fallbackTitles = [
        `${genre || 'Beat'} Masterpiece`,
        `Epic ${genre || 'Instrumental'}`,
        `${genre || 'Beat'} Vibes`,
        `Fire ${genre || 'Beat'}`,
        `Sick ${genre || 'Instrumental'}`,
        `${genre || 'Beat'} Flow`,
        `Dope ${genre || 'Beat'}`,
        `Fresh ${genre || 'Instrumental'}`
    ];
    
    return fallbackTitles.map(title => ({
        title: title,
        confidence: 0.8
    }));
}

function showAILoading() {
    const suggestionsContainer = document.getElementById('ai-title-suggestions');
    const loadingDiv = document.getElementById('ai-loading');
    const suggestionsList = document.getElementById('ai-suggestions-list');
    
    suggestionsContainer.style.display = 'block';
    loadingDiv.style.display = 'flex';
    suggestionsList.style.display = 'none';
}

function displayAISuggestions(suggestions) {
    const loadingDiv = document.getElementById('ai-loading');
    const suggestionsList = document.getElementById('ai-suggestions-list');
    
    loadingDiv.style.display = 'none';
    suggestionsList.style.display = 'block';
    
    // Sort by confidence score
    suggestions.sort((a, b) => b.confidence - a.confidence);
    
    suggestionsList.innerHTML = suggestions.map((suggestion, index) => `
        <div class="ai-suggestion-item" data-title="${suggestion.title}">
            <div class="ai-suggestion-text">${suggestion.title}</div>
            <div class="ai-suggestion-actions">
                <button type="button" class="btn-use-suggestion" onclick="useAISuggestion('${suggestion.title}')">
                    Use
                </button>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for suggestion items
    suggestionsList.querySelectorAll('.ai-suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            useAISuggestion(title);
        });
    });
}

function useAISuggestion(title) {
    document.getElementById('beat-title').value = title;
    closeAISuggestions();
    showNotification(`Title "${title}" applied!`, 'success');
}

function closeAISuggestions() {
    const suggestionsContainer = document.getElementById('ai-title-suggestions');
    suggestionsContainer.style.display = 'none';
}

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    const suggestionsContainer = document.getElementById('ai-title-suggestions');
    const aiButton = document.getElementById('ai-title-generator');
    
    if (suggestionsContainer && 
        suggestionsContainer.style.display === 'block' && 
        !suggestionsContainer.contains(e.target) && 
        !aiButton.contains(e.target)) {
        closeAISuggestions();
    }
});
