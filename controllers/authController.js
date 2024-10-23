const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to create a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
exports.registerUser = async (req, res) => {
    const { username, password, email, phonenumber, firstname, lastname, location } = req.body;
    console.log('Registration request data:', req.body); 

    try {
        // Validate input
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        // Check if the user already exists by username
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if the user already exists by email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            username, 
            password: hashedPassword, 
            email, 
            phonenumber, 
            firstname, 
            lastname, 
            location 
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = createToken(user._id);
        res.json({ token, username: user.username, email: user.email ,userDetail: user}); // Return token and user info
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error logging in user' });
    }
};

// Fetch User by Email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ username: user.username });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
};
