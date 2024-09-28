require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://newschool-pro.vercel.app/']
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Customer schema
const customerSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    message: String,
    created_at: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

// API Route for form submissions
app.post('/api/submit-form', async (req, res) => {
    console.log('Received request:', req.body);

    // Destructure the incoming request body
    const { full_name, email, message } = req.body;

    // Log to ensure variables are defined
    console.log('Form Data:', { full_name, email, message });

    const newCustomer = new Customer({
        full_name,
        email,
        message
    });

    try {
        await newCustomer.save();
        res.json({ message: 'Form Submitted Successfully!' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ message: 'Error saving data' });
    }
});

// Start the server (for local testing)
const PORT = process.env.PORT || 3000; // Use Vercel's PORT or default to 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


module.exports = app;  // Required for Vercel to recognize it
