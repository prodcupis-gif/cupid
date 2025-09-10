# 🚀 Prod.Cupid Music Store - Deployment Guide

## 🎯 Quick Start - Go Live in 30 Minutes!

### Step 1: Get Your API Keys

#### OpenAI API Key (for AI Title Generation)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-`)

#### Stripe API Keys (for Payments)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up or log in
3. Go to Developers → API Keys
4. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
5. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)

### Step 2: Configure Your Site

1. **Open `config.js`** in your project folder
2. **Replace the placeholder values:**

```javascript
const CONFIG = {
    OPENAI: {
        API_KEY: 'sk-your-actual-openai-key-here', // Replace this
        // ... other settings
    },
    STRIPE: {
        PUBLISHABLE_KEY: 'pk_test_your-actual-stripe-key-here', // Replace this
        // ... other settings
    },
    SITE: {
        NAME: 'Your Store Name', // Customize this
        TAGLINE: 'Your Custom Tagline', // Customize this
        CONTACT_EMAIL: 'your-email@domain.com', // Replace this
        LOCATION: 'Your City, State', // Replace this
    }
};
```

### Step 3: Add Your Content

1. **Access Admin Panel:**
   - Go to `admin.html` or click logo 5 times on main site
   - Login: `prodcupid` / `cupid2024`

2. **Upload Your Beats:**
   - Go to "Manage Beats" → "Add New Beat"
   - Upload your audio files
   - Use AI title generator (✨ magic wand button)
   - Set prices and descriptions

3. **Customize Your Site:**
   - Go to "Settings" tab
   - Upload a custom hero image
   - Update site information

### Step 4: Choose Your Hosting

#### Option A: Netlify (Recommended - Free)
1. Go to [Netlify](https://netlify.com/)
2. Sign up for free
3. Drag and drop your entire project folder
4. Your site will be live instantly!

#### Option B: Vercel (Free)
1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Upload your project
4. Deploy with one click

#### Option C: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload your files
3. Enable GitHub Pages in settings
4. Your site will be at `username.github.io/repository-name`

### Step 5: Custom Domain (Optional)

1. **Buy a domain** from:
   - Namecheap
   - GoDaddy
   - Google Domains

2. **Connect to your hosting:**
   - Add your domain in hosting settings
   - Update DNS records as instructed

### Step 6: Test Everything

1. **Test the main site:**
   - Browse beats
   - Test contact form
   - Check mobile responsiveness

2. **Test admin panel:**
   - Upload a beat
   - Test AI title generator
   - Verify all features work

3. **Test payments:**
   - Use Stripe test mode first
   - Test with test card: `4242 4242 4242 4242`
   - Switch to live mode when ready

## 🔧 Advanced Configuration

### Environment Variables (For Production)

For better security, use environment variables instead of hardcoding API keys:

```javascript
// In config.js, use environment variables
const CONFIG = {
    OPENAI: {
        API_KEY: process.env.OPENAI_API_KEY || 'your-key-here',
    },
    STRIPE: {
        PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || 'your-key-here',
    }
};
```

### SSL Certificate

Most hosting services provide free SSL certificates. Make sure your site uses HTTPS for:
- Secure payments
- API calls
- Better SEO ranking

### Performance Optimization

1. **Compress images** before uploading
2. **Optimize audio files** (MP3, 320kbps recommended)
3. **Enable caching** in hosting settings
4. **Use CDN** for faster loading

## 📊 Analytics & Monitoring

### Google Analytics
1. Create Google Analytics account
2. Add tracking code to `index.html`
3. Monitor visitor behavior and sales

### Stripe Dashboard
1. Monitor payments and transactions
2. Set up webhooks for order processing
3. Track revenue and customer data

## 🛡️ Security Checklist

- [ ] API keys are not exposed in public repositories
- [ ] HTTPS is enabled
- [ ] Admin credentials are changed from defaults
- [ ] File uploads are validated
- [ ] Contact form has spam protection

## 🚨 Troubleshooting

### Common Issues:

**AI Title Generator not working:**
- Check OpenAI API key is correct
- Verify you have credits in OpenAI account
- Check browser console for errors

**Payments not processing:**
- Verify Stripe keys are correct
- Check if you're in test/live mode
- Ensure HTTPS is enabled

**Images not uploading:**
- Check file size (max 5MB)
- Verify file format (JPG, PNG, WebP)
- Check browser console for errors

## 📞 Support

If you need help:
1. Check browser console for error messages
2. Verify all API keys are correct
3. Test with different browsers
4. Check hosting service documentation

## 🎉 You're Live!

Once deployed, your music store will have:
- ✅ Professional design
- ✅ AI-powered title generation
- ✅ Secure payment processing
- ✅ Mobile-responsive layout
- ✅ Admin panel for easy management
- ✅ Custom branding options

**Your music store is ready to start selling beats!** 🎵💰

---

## 📋 Pre-Launch Checklist

- [ ] API keys configured
- [ ] Content uploaded (beats, images)
- [ ] Contact information updated
- [ ] Payment system tested
- [ ] Mobile responsiveness verified
- [ ] Admin panel tested
- [ ] Domain connected (if using custom domain)
- [ ] SSL certificate active
- [ ] Analytics tracking set up
- [ ] Backup created

**Ready to launch!** 🚀
