const mongoose = require("mongoose");  
const express = require("express");     
const morgan = require("morgan");       
const bodyParser = require("body-parser"); 
const cors = require("cors");           
const cookieParser = require("cookie-parser"); 
require("dotenv").config();    
const errorHandler = require("./middleware/error");         
// Import routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));


// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser()); 
app.use(cors()); 

// Routes 
app.use('/api', authRoutes);

// Error handler middleware (should be placed after routes)
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
