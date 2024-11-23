const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { token } = req.headers;
    console.log(token)
    if (token) {
        let id = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ id });
        if(user) {
            res.json({loggedIn: true})
        }else{
            res.json({loggedIn: false})
        }
    } else {
        try {
            console.log(email, password);
            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Login successful', loggedIn: true, token });
            } else {
                res.status(401).json({ message: 'Invalid credentials', loggedIn: false, });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', loggedIn: false, error });
        }
    }
};
