import express from 'express';
import { body } from 'express-validator';
import { register, login, getUserProfile, logout } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post(
    '/register',
    [
        body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
    ],
    register
);

router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists()
    ],
    login
);

router.get('/profile', authenticate, getUserProfile);

router.post('/logout', authenticate, logout);

export default router;