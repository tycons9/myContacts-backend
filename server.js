const express = require('express');
require('dotenv').config(); // Fix dotenv initialization
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies (Make sure this is before any routes)
app.use(express.json()); // This is important to parse JSON request bodies

// Use contact routes
app.use('/api/contacts', contactRoutes);

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
