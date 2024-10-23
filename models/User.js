// User Model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^\+?[1-9]\d{1,14}$/ // Optional: Regex for phone number validation
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    location: { 
        type: String, 
        enum: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'], // Restricting to specified cities
        required: true // Making location required
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
