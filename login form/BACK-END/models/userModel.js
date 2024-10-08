const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "first name is required"],
        maxlength: [30, "first name must be less than or equal to 30 characters"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email is required"],
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "please add a valid email"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required"],
        minlength: [6, "password must have at least 6 characters"]
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiredAt: Date, 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
