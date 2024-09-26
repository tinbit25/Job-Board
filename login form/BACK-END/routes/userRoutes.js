const express = require('express');
const router = express.Router();
const { allUsers, singleUser } = require('../controllers/userController'); // Assuming this is the correct controller
const { isAuthenticated,isAdmin } = require('../middleware/auth');

// Define the route to fetch all users
router.get('/allUsers', isAuthenticated,isAdmin, allUsers); // Protected route for fetching all users
router.get('/user/:id', isAuthenticated, singleUser); // Protected route for fetching all users

module.exports = router;
