const express = require('express');
const router = express.Router();
const { signup,verifyEmail} = require('../controllers/authController');
// const { signup, signin, logout, userProfile } = require('../controllers/authController');
// const { isAuthenticated } = require('../middleware/auth');

// Auth routes
router.post('/signup', signup);
// router.post('/signin', signin);
// router.get('/logout', logout);
// router.get('/me', isAuthenticated, userProfile); // Protected route for user profile
router.post("/verify-email",verifyEmail)
module.exports = router;
