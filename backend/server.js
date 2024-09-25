require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
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
    const { full_name, email, message } = req.body;

    const newCustomer = new Customer({
        full_name,
        email,
        message
    });

    try {
        await newCustomer.save();
        console.log('Data saved to MongoDB');
        res.json({ message: 'Form Submitted Successfully!' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ message: 'Error saving data' });
    }
});

// Start the server (for local testing)
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

module.exports = app;  // Required for Vercel to recognize it
