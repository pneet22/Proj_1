import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Create a new user (basic)
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        const existing = await userModel.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashed });
        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ token });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

// Authenticate a user (basic)
export const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
