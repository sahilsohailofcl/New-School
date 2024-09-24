require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Log the MongoDB URI to verify it's being read correctly
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
    const { full_name, email, message } = req.body;

    const newCustomer = new Customer({
        full_name,
        email,
        message
    });

    try {
        await newCustomer.save();  // Await the save method
        res.send('Form submitted successfully!');
    } catch (err) {
        res.send('Error saving data');
    }
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
