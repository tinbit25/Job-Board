const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie'); // Correct path
const User = require('../models/userModel');
const bcryptjs = require('bcrypt');
const { sendVerificationEmail } = require('../mailtrap/emails');


// User signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        await user.save();
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        // Find user by verificationToken and make sure the token is not expired
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() } // Correct field and check expiration
        });

        // If no user is found or the token is expired, return an error
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            });
        }

        // Mark user as verified
        user.isVerified = true;
        user.verificationToken = undefined; 
        user.verificationTokenExpiresAt = undefined; 

        // Save the updated user to the database
        await user.save();

        // Send a welcome email
        await sendWelcomeEmail(user.email, user.name);

        // Respond with success
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined  // Do not send password in response
            }
        });
    } catch (error) {
        console.error("Error during verification:", error); // Log the error
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




// // User signin
// exports.signin = async (req, res, next) => {
//     const { email, password } = req.body;

//     // Validate if email and password are provided
//     if (!email || !password) {
//         return next(new ErrorResponse('Please provide both email and password', 400));
//     }

//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return next(new ErrorResponse('Invalid credentials', 400));
//         }

//         // Check if password matches
//         const isMatched = await user.comparePassword(password);
//         if (!isMatched) {
//             return next(new ErrorResponse('Invalid credentials', 400));
//         }

//         // Send token response
//         sendTokenResponse(user, 200, res);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };

// // Helper function to send token response
// const sendTokenResponse = async (user, codeStatus, res) => {
//     // Generate JWT token
//     const token = await user.getJwtToken();

//     // Cookie expiration time (e.g., 1 hour)
//     const oneHour = 3600000;

//     // Send response with cookie
//     res
//         .status(codeStatus)
//         .cookie("token", token, {
//             httpOnly: true, // The cookie is only accessible by the web server
//             expires: new Date(Date.now() + oneHour), // Cookie expiration
//             secure: process.env.NODE_ENV === 'production', // Secure cookie in production
//             sameSite: 'Strict' // Cookie is sent for same-site requests only
//         })
//         .json({
//             success: true,
//             token
//         });
// };

// // User logout
// exports.logout = (req, res) => {
//     res.clearCookie('token');
//     res.status(200).json({
//         success: true,
//         message: "Logged out"
//     });
// };

// // User profile
// exports.userProfile = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password"); // Exclude password

//         res.status(200).json({
//             success: true,
//             user
//         });
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };
