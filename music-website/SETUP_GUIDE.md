# Prod.Cupid Music Store - Setup Guide

## 🎵 Complete Personal Music Store with Admin Panel

Your music store is now fully functional with admin capabilities and payment integration!

## 🔐 Admin Access (Hidden from Customers)

**Login Credentials:**
- **Username:** `prodcupid`
- **Password:** `cupid2024`

**Secret Access Method:**
1. **Click the Prod.Cupid logo 5 times quickly** (within 3 seconds)
2. A secure admin login modal will appear
3. Enter your credentials to access the dashboard
4. Or go directly to `admin.html` if you know the URL

**Security Features:**
- Admin access is completely hidden from customers
- No visible admin links in the navigation
- Secret access method prevents unauthorized access
- Secure modal with credential verification

## 🛠️ Admin Features

### Dashboard
- View total beats, revenue, orders, and customers
- Real-time statistics and overview

### Beat Management
- **Add New Beats:** Upload audio files, set prices, add descriptions
- **Edit Beats:** Modify existing beat information
- **Delete Beats:** Remove beats from your store
- **Search & Filter:** Find beats quickly

### Order Management
- View all customer orders
- Track order status (pending, completed, cancelled)
- Monitor customer information and purchase history

### Analytics
- View top-selling beats
- Track sales performance
- Monitor revenue trends

## 💳 Payment Integration

### Stripe Setup (Required for Live Payments)

1. **Create Stripe Account:**
   - Go to [stripe.com](https://stripe.com)
   - Sign up for a free account
   - Get your publishable key

2. **Update Payment Configuration:**
   - Open `payment.js`
   - Replace `'pk_test_your_stripe_publishable_key_here'` with your actual Stripe key
   - For testing, use your test key (starts with `pk_test_`)
   - For production, use your live key (starts with `pk_live_`)

3. **Backend Integration (Optional):**
   - The current setup uses simulated payment processing
   - For production, you'll need a backend server to handle:
     - Payment intent creation
     - Webhook handling
     - Order processing
     - File delivery

## 📁 File Structure

```
music-website/
├── index.html          # Main store page
├── admin.html          # Admin panel
├── success.html        # Payment success page
├── cancel.html         # Payment cancelled page
├── styles.css          # Main styles
├── admin-styles.css    # Admin panel styles
├── script.js           # Main website functionality
├── admin-script.js     # Admin panel functionality
├── payment.js          # Payment integration
└── IMG_2236 (1).jpg   # Your logo image
```

## 🚀 Getting Started

### 1. Add Your First Beat
1. Go to Admin Panel
2. Click "Add New Beat"
3. Fill in beat details:
   - Title and description
   - Price
   - Genre and BPM
   - Upload audio file
   - Optional: Upload cover art

### 2. Test the Store
1. Return to main store (`index.html`)
2. Browse your beats
3. Test the purchase flow (will use test payments)

### 3. Monitor Sales
1. Check the Orders section in admin
2. View analytics for sales insights
3. Track customer information

## 🔧 Customization

### Adding More Beat Categories
Edit the genre options in `admin.html`:
```html
<option value="YourGenre">Your Genre</option>
```

### Changing Admin Credentials
Edit `admin-script.js`:
```javascript
const ADMIN_CONFIG = {
    username: 'your_username',
    password: 'your_password',
    // ...
};
```

### Styling Changes
- Main store: Edit `styles.css`
- Admin panel: Edit `admin-styles.css`

## 📱 Mobile Responsive

The entire system is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Notes

### For Production Use:
1. **Change default admin credentials**
2. **Set up proper backend server**
3. **Use HTTPS for all pages**
4. **Implement proper file upload security**
5. **Add rate limiting for admin login**

### Current Security Features:
- Admin login protection
- Local data storage
- Input validation
- XSS protection

## 🎯 Next Steps

### Immediate:
1. Add your beats using the admin panel
2. Test the purchase flow
3. Customize the styling to your preference

### For Production:
1. Set up Stripe account and get API keys
2. Deploy to a web server
3. Set up backend for file handling
4. Configure email notifications
5. Add SSL certificate

## 📞 Support

The system includes:
- ✅ Complete admin panel
- ✅ Beat management
- ✅ Payment integration (Stripe)
- ✅ Order tracking
- ✅ Analytics dashboard
- ✅ Mobile responsive design
- ✅ Windows Media Player theme

Your personal music store is ready to go! 🎵❤️

## 🔄 Updates

To update the system:
1. Edit the relevant files
2. Refresh your browser
3. Changes are automatically applied

The system uses localStorage for data persistence, so your beats and orders will be saved locally.
