const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Not authorized -invalid token",
        });
    } 
      req.userId = decoded.userId;

        next(); 
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};


  
// Middleware for admin
// exports.isAdmin = (req, res, next) => {
//     if (req.user.role === 0) {
//         return next(new ErrorResponse('Access denied, you must be an admin', 401));
//     }
//     next(); // Continue to the next middleware or route handler
// };
