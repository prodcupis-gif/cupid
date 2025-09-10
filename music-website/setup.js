// Setup script to help configure your music store
// Run with: node setup.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🎵 Welcome to Prod.Cupid Music Store Setup!');
console.log('This script will help you configure your API keys and settings.\n');

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function setup() {
    try {
        console.log('📋 Let\'s configure your music store:\n');
        
        // Site Information
        const siteName = await askQuestion('🏪 Site Name (default: Prod.Cupid): ') || 'Prod.Cupid';
        const tagline = await askQuestion('💭 Site Tagline (default: Premium Beats & Music Services): ') || 'Premium Beats & Music Services';
        const contactEmail = await askQuestion('📧 Contact Email (default: contact@prodcupid.com): ') || 'contact@prodcupid.com';
        const location = await askQuestion('📍 Location (default: Los Angeles, CA): ') || 'Los Angeles, CA';
        
        // API Keys
        console.log('\n🔑 API Configuration:');
        console.log('You can get these keys from:');
        console.log('- OpenAI: https://platform.openai.com/api-keys');
        console.log('- Stripe: https://dashboard.stripe.com/apikeys\n');
        
        const openaiKey = await askQuestion('🤖 OpenAI API Key (optional, press Enter to skip): ');
        const stripePublishableKey = await askQuestion('💳 Stripe Publishable Key (optional, press Enter to skip): ');
        
        // Create config file
        const configContent = `// Configuration file for API keys and settings
// IMPORTANT: Never commit this file to public repositories with real API keys

const CONFIG = {
    // OpenAI API Configuration
    OPENAI: {
        API_KEY: '${openaiKey || 'your_openai_api_key_here'}',
        MODEL: 'gpt-3.5-turbo',
        MAX_TOKENS: 150,
        TEMPERATURE: 0.8
    },
    
    // Stripe Configuration
    STRIPE: {
        PUBLISHABLE_KEY: '${stripePublishableKey || 'pk_test_your_stripe_publishable_key_here'}',
        SECRET_KEY: 'sk_test_your_stripe_secret_key_here',
        CURRENCY: 'usd',
        SUCCESS_URL: window.location.origin + '/success.html',
        CANCEL_URL: window.location.origin + '/cancel.html'
    },
    
    // Site Configuration
    SITE: {
        NAME: '${siteName}',
        TAGLINE: '${tagline}',
        CONTACT_EMAIL: '${contactEmail}',
        LOCATION: '${location}'
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
}`;

        fs.writeFileSync('config.js', configContent);
        
        console.log('\n✅ Configuration saved to config.js!');
        console.log('\n🚀 Next Steps:');
        console.log('1. Add your beats using the admin panel');
        console.log('2. Test the AI title generator');
        console.log('3. Deploy to your hosting service');
        console.log('4. Start selling beats!');
        
        console.log('\n📖 For detailed deployment instructions, see DEPLOYMENT_GUIDE.md');
        console.log('\n🎵 Your music store is ready to go live!');
        
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    } finally {
        rl.close();
    }
}

setup();
