const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Correct

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "first name is required"],
        maxlength: [30, "first name must be less than or equal to 30 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "last name is required"],
        maxlength: [30, "last name must be less than or equal to 30 characters"]
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
        minlength: [6, "password must have at least 6 characters"]  // Changed from maxlength to minlength
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Encrypting password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
//compare pasword
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


//return ajwt
userSchema.methods.getJwtToken = function() {
    // Generate JWT token
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expiration time (1 hour)
    });
};


module.exports = mongoose.model("User", userSchema);
