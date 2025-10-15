import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes);

// Export app so server.js can import and start it after DB connects
export default app;