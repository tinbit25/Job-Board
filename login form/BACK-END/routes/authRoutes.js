const express = require('express');
const router = express.Router();
const { signup,verifyEmail,logout,login,forgotPassword,resetPassword,checkAuth} = require('../controllers/authController');
const {isAuthenticated}=require('../middleware/verifyToken')
// Auth routes
router.get("/check-auth",isAuthenticated,checkAuth)
router.post('/signup', signup);
router.post("/verify-email",verifyEmail)
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword); 
router.post('/reset-password/:token', resetPassword); 

module.exports = router;
