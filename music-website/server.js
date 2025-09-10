// Simple Node.js server for production deployment
// Run with: node server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🎵 Prod.Cupid Music Store running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} to view your site`);
    console.log(`🔧 Admin panel: http://localhost:${PORT}/admin.html`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 Shutting down gracefully...');
    process.exit(0);
});
