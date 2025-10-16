import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config(); // Load env vars

// Middleware to authenticate requests using JWT        

export const authenticate = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const secret = process.env.JWT_PRIVATE_KEY || process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        req.user = await userModel.findById(decoded._id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};