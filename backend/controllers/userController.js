const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
    // console.log(req.body);
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const newUser = await User.create({ name, email, password: hashedPassword }); // Save user
        await newUser.save()
        const user = await User.findOne({ email });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered', success: true, token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error, success: false });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { token } = req.headers;
    if (token) {
        try {
            let id = jwt.verify(token, process.env.JWT_SECRET); // Verify token
            const user = await User.findOne({ _id: id }); // Find user by _id
            if (user) {
                return res.json({ loggedIn: true, user });
            } else {
                return res.json({ loggedIn: false });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token', loggedIn: false });
        }
    } else {
        try {
            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({
                    message: 'Login successful',
                    loggedIn: true,
                    token,
                    user,
                });
            } else {
                return res.status(401).json({ message: 'Invalid credentials', loggedIn: false });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error logging in', loggedIn: false, error });
        }
    }
};
