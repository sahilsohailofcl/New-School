require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Create a schema for customer data
const customerSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    message: String,
    created_at: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
    const { full_name, email, message } = req.body;

    const newCustomer = new Customer({
        full_name,
        email,
        message
    });

    newCustomer.save((err) => {
        if (err) {
            res.send('Error saving data');
        } else {
            res.send('Form submitted successfully!');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
