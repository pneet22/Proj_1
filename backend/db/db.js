import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async () => {
    try {
        const uri = process.env.DB_CONNECT || process.env.MONGO_URI;
        if (!uri) {
            throw new Error('Database connection string is not defined in environment variables (DB_CONNECT or MONGO_URI)');
        }
        await mongoose.connect(uri, { dbName: process.env.DB_NAME });
        console.log('Successfully connected to DB');
    } catch (error) {
        console.error('Could not connect to DB:', error);
        throw error; // rethrow so caller (server) can handle exit
    }
};

export default connectToDB;