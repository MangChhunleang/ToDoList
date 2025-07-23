const bcrypt = require('bcrypt');
const { createUser, findUserByEmail, findUserById, updateUser } = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const hash = await bcrypt.hash(password, 10);
        await createUser({ username, email, password: hash });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        req.login(user, (err) => {
            if (err) return next(err);
            const { password, ...userProfile } = user;
            res.status(200).json(userProfile);
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
};

const getProfile = async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userProfile } = req.user;
    res.status(200).json(userProfile);
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;
        if (!username && !email) {
            return res.status(400).json({ message: 'At least one field is required' });
        }
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        await updateUser(userId, updateData);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
};

const logout = (req, res) => {
    req.logout(() => {
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    logout
};
