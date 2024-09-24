require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


const cors = require('cors');

app.use(cors({
    origin: 'https://newschool-mocha.vercel.app'
}));


// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON bodies

// Log the MongoDB URI to verify it's being read correctly
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Create a schema for customer data
const customerSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    message: String,
    created_at: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

// Route to handle form submissions
app.post('/submit-form', async (req, res) => {

    const { full_name, email, message } = req.body; // Destructure the form fields

    // Create a new customer document
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

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
