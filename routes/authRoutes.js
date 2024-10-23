const express = require('express');
const {
    registerUser,
    loginUser,
    getUserByEmail
} = require('../controllers/authController');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get user information by email
router.get('/user/:email', getUserByEmail);

module.exports = router;
