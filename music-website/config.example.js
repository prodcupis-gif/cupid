// Example configuration file - Copy this to config.js and add your real API keys
// IMPORTANT: Never commit config.js with real API keys to public repositories

const CONFIG = {
    // OpenAI API Configuration
    OPENAI: {
        API_KEY: 'sk-your-openai-api-key-here', // Get from https://platform.openai.com/api-keys
        MODEL: 'gpt-3.5-turbo',
        MAX_TOKENS: 150,
        TEMPERATURE: 0.8
    },
    
    // Stripe Configuration
    STRIPE: {
        PUBLISHABLE_KEY: 'pk_test_your-stripe-publishable-key-here', // Get from https://dashboard.stripe.com/apikeys
        SECRET_KEY: 'sk_test_your-stripe-secret-key-here', // For server-side use only
        CURRENCY: 'usd',
        SUCCESS_URL: window.location.origin + '/success.html',
        CANCEL_URL: window.location.origin + '/cancel.html'
    },
    
    // Site Configuration
    SITE: {
        NAME: 'Prod.Cupid',
        TAGLINE: 'Premium Beats & Music Services',
        CONTACT_EMAIL: 'contact@prodcupid.com',
        LOCATION: 'Los Angeles, CA'
    },
    
    // AI Title Generation Settings
    AI_TITLES: {
        MAX_SUGGESTIONS: 8,
        GENRES: ['Trap', 'Hip-Hop', 'R&B', 'Pop', 'Lo-Fi', 'Drill', 'Afrobeat', 'Electronic', 'Jazz', 'Rock'],
        MOODS: ['Love', 'Heartbreak', 'Dreams', 'Night', 'Sunset', 'Rain', 'Fire', 'Ice', 'Gold', 'Silver', 'Diamond', 'Crystal', 'Urban', 'Street', 'Chill', 'Aggressive'],
        STYLES: ['Dark', 'Bright', 'Melodic', 'Hard', 'Smooth', 'Rough', 'Clean', 'Dirty', 'Fresh', 'Vintage', 'Modern', 'Classic']
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
