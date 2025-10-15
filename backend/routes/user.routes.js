import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/user.controller.js';

const router = express.Router();

router.post(
    '/register',
    [
        body('name').isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    register
);

router.post(
    '/login',
    [body('email').isEmail().withMessage('Invalid email'), body('password').isLength({ min: 6 }).withMessage('Invalid password')],
    login
);

export default router;