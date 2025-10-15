import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config(); // Load env vars

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});

// Instance methods
userSchema.methods.generateAuthToken = function () {
    const secret = process.env.JWT_PRIVATE_KEY || process.env.JWT_SECRET;
    return jwt.sign({ _id: this._id, email: this.email }, secret, { expiresIn: '1h' });
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Static methods
userSchema.statics.hashPassword = function (password) {
    return bcrypt.hashSync(password, 10);
};

const User = mongoose.model('User', userSchema);
export default User;
