const ErrorResponse = require('../utils/errorResponse'); // Adjust path if necessary
const User = require('../models/userModel');

// User signup
exports.signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorResponse('Please provide all required fields', 400));
    }

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return next(new ErrorResponse('Email already registered', 400));
        }

        // Create new user
        const user = await User.create({ firstName, lastName, email, password });
        sendTokenResponse(user, 201, res); // Send token response after user creation
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// User signin
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate if email and password are provided
    if (!email || !password) {
        return next(new ErrorResponse('Please provide both email and password', 400));
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 400));
        }

        // Check if password matches
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse('Invalid credentials', 400));
        }

        // Send token response
        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Helper function to send token response
const sendTokenResponse = async (user, codeStatus, res) => {
    // Generate JWT token
    const token = await user.getJwtToken();

    // Cookie expiration time (e.g., 1 hour)
    const oneHour = 3600000;

    // Send response with cookie
    res
        .status(codeStatus)
        .cookie("token", token, {
            httpOnly: true, // The cookie is only accessible by the web server
            expires: new Date(Date.now() + oneHour), // Cookie expiration
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production
            sameSite: 'Strict' // Cookie is sent for same-site requests only
        })
        .json({
            success: true,
            token
        });
};

// User logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    });
};

// User profile
exports.userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
