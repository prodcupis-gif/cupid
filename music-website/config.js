// Configuration file for API keys and settings
// IMPORTANT: Never commit this file to public repositories with real API keys

const CONFIG = {
    // OpenAI API Configuration
    OPENAI: {
        API_KEY: 'your_openai_api_key_here', // Replace with your actual OpenAI API key
        MODEL: 'gpt-3.5-turbo',
        MAX_TOKENS: 150,
        TEMPERATURE: 0.8
    },
    
    // Stripe Configuration
    STRIPE: {
        PUBLISHABLE_KEY: 'pk_test_your_stripe_publishable_key_here', // Replace with your Stripe key
        SECRET_KEY: 'sk_test_your_stripe_secret_key_here', // For server-side use only
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
