// Payment Integration with Stripe
// Configuration loaded from config.js

const stripe = Stripe(CONFIG.STRIPE.PUBLISHABLE_KEY);

// Payment configuration
const PAYMENT_CONFIG = {
    currency: CONFIG.STRIPE.CURRENCY,
    successUrl: CONFIG.STRIPE.SUCCESS_URL,
    cancelUrl: CONFIG.STRIPE.CANCEL_URL
};

// Initialize payment system
document.addEventListener('DOMContentLoaded', function() {
    initializePaymentSystem();
});

function initializePaymentSystem() {
    // Add payment functionality to all purchase buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-small') && e.target.textContent.includes('Purchase')) {
            e.preventDefault();
            const beatCard = e.target.closest('.beat-card');
            const beatTitle = beatCard.querySelector('h3').textContent;
            const beatPrice = parseFloat(beatCard.querySelector('.price').textContent.replace('$', ''));
            
            initiatePayment(beatTitle, beatPrice);
        }
    });
}

async function initiatePayment(beatTitle, price) {
    try {
        // Show loading state
        showPaymentLoading();
        
        // Create checkout session via Netlify Function
        const resp = await fetch('/api/stripe-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: beatTitle, price })
        });
        const data = await resp.json();
        if (!resp.ok) {
            throw new Error(data?.error || 'Checkout session failed');
        }
        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
            sessionId: data.id
        });
        
        if (error) {
            console.error('Error:', error);
            showNotification('Payment failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Payment processing failed. Please try again.', 'error');
    } finally {
        hidePaymentLoading();
    }
}

// Removed simulated server; using Netlify Functions instead

// Service payment handling
async function initiateServicePayment(serviceTitle, price) {
    try {
        showPaymentLoading();
        
        const paymentIntent = await createPaymentIntent(serviceTitle, price);
        
        const { error } = await stripe.redirectToCheckout({
            sessionId: paymentIntent.sessionId
        });
        
        if (error) {
            console.error('Error:', error);
            showNotification('Payment failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Payment processing failed. Please try again.', 'error');
    } finally {
        hidePaymentLoading();
    }
}

// Payment loading states
function showPaymentLoading() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'payment-loading';
    loadingOverlay.innerHTML = `
        <div class="payment-loading-content">
            <div class="loading-spinner"></div>
            <p>Processing payment...</p>
        </div>
    `;
    
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(loadingOverlay);
}

function hidePaymentLoading() {
    const loadingOverlay = document.getElementById('payment-loading');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Add loading spinner styles
const loadingStyles = `
    .payment-loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 0, 0, 0.3);
        border-top: 3px solid #FF0000;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Order management functions
function createOrder(beatTitle, price, customerEmail) {
    const order = {
        id: 'ORD' + Date.now(),
        customerName: 'Customer', // In real app, get from form
        email: customerEmail,
        date: new Date().toISOString(),
        status: 'pending',
        total: price,
        items: [
            { title: beatTitle, price: price }
        ]
    };
    
    // Save order to localStorage (in real app, save to database)
    const orders = JSON.parse(localStorage.getItem('prodcupid_orders') || '[]');
    orders.push(order);
    localStorage.setItem('prodcupid_orders', JSON.stringify(orders));
    
    return order;
}

// Update beat sales count
function updateBeatSales(beatTitle) {
    const beats = JSON.parse(localStorage.getItem('prodcupid_admin_data') || '{}');
    if (beats.beats) {
        const beat = beats.beats.find(b => b.title === beatTitle);
        if (beat) {
            beat.sales = (beat.sales || 0) + 1;
            localStorage.setItem('prodcupid_admin_data', JSON.stringify(beats));
        }
    }
}

// Success page handling (create success.html)
function createSuccessPage() {
    const successHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful - Prod.Cupid</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="success-container">
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your beat will be available for download shortly.</p>
            <div class="success-actions">
                <a href="index.html" class="btn btn-primary">Return to Store</a>
                <a href="admin.html" class="btn btn-secondary">Admin Panel</a>
            </div>
        </div>
    </div>
    
    <style>
        .success-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0000 50%, #2d0000 100%);
        }
        
        .success-content {
            text-align: center;
            background: rgba(0, 0, 0, 0.8);
            padding: 3rem;
            border-radius: 15px;
            border: 2px solid #FF0000;
            max-width: 500px;
        }
        
        .success-icon i {
            font-size: 4rem;
            color: #28a745;
            margin-bottom: 1rem;
        }
        
        .success-content h1 {
            color: #FF0000;
            margin-bottom: 1rem;
        }
        
        .success-content p {
            color: #ccc;
            margin-bottom: 2rem;
        }
        
        .success-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
    </style>
</body>
</html>`;
    
    // This would typically be created as a separate file
    console.log('Success page HTML created');
}

// Cancel page handling (create cancel.html)
function createCancelPage() {
    const cancelHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Cancelled - Prod.Cupid</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="cancel-container">
        <div class="cancel-content">
            <div class="cancel-icon">
                <i class="fas fa-times-circle"></i>
            </div>
            <h1>Payment Cancelled</h1>
            <p>Your payment was cancelled. No charges have been made.</p>
            <div class="cancel-actions">
                <a href="index.html" class="btn btn-primary">Return to Store</a>
            </div>
        </div>
    </div>
    
    <style>
        .cancel-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0000 50%, #2d0000 100%);
        }
        
        .cancel-content {
            text-align: center;
            background: rgba(0, 0, 0, 0.8);
            padding: 3rem;
            border-radius: 15px;
            border: 2px solid #FF0000;
            max-width: 500px;
        }
        
        .cancel-icon i {
            font-size: 4rem;
            color: #dc3545;
            margin-bottom: 1rem;
        }
        
        .cancel-content h1 {
            color: #FF0000;
            margin-bottom: 1rem;
        }
        
        .cancel-content p {
            color: #ccc;
            margin-bottom: 2rem;
        }
    </style>
</body>
</html>`;
    
    console.log('Cancel page HTML created');
}

// Initialize success and cancel pages
createSuccessPage();
createCancelPage();
