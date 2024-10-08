const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie'); 
const User = require('../models/userModel');
const bcryptjs = require('bcrypt');
const crypto = require('crypto');
const { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail} = require('../mailtrap/emails');


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

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours expiration
        });

        await user.save();
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


exports.verifyEmail = async (req, res) => {
    const code = req.body.code.trim();  


   
    try {
        console.log("Verification code received:", code);
        
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiredAt: { $gt: Date.now() }  // Token should be valid and not expired
        });
        
        if (!user) {
            console.log("No matching user found, or token expired.");
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            });
        }

        console.log("Matching user found:", user.email);
        console.log("Token expires at:", user.verificationTokenExpiredAt);
        console.log("Current time:", Date.now());

        // Mark the user as verified
        user.isVerified = true;
        user.verificationToken = undefined;  // Clear the token after verification
        user.verificationTokenExpiredAt = undefined;
        
        await user.save();
        console.log("User verification successful.");

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,  // Never send password back to client
            }
        });
    } catch (error) {
        console.error("Error during verification:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// User signin
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validate if email and password are provided
    if (!email || !password) {
        return (new ErrorResponse('Please provide both email and password', 400));
    }

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid credential"
            });
        }

        // Check if password matches
        const isPasswordValid = await bcryptjs.compare(password,user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "invalid credential"
            });
        }

        generateTokenAndSetCookie(res,user._id)

        user.lastLogin=new Date()
        await user.save();
        res.status(200).json({
            success:true,
            message:"Logged in successfully",
            user:{
                ...user._doc,
                password:undefined,
            },
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
        
    }
};


// User logout
exports.logout = async(req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    });
};
exports.forgotPassword=async(req,res)=>{
   const {email}=req.body
    try {
        const user=await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

//Gnerate reset token
const resetToken=crypto.randomBytes(20).toString('hex')
    const resetTokenExpiredAt=Date.now()+1*60*60*1000;
   user.resetPasswordToken=resetToken
   user.resetPasswordExpiredAt=resetTokenExpiredAt
   await user.save()

   await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
   res.status(200).json({
    success: true,
    message: "password reset link sent to your email"
});
    } catch (error) {
        console.log("Error in forgot Password",error)
        res.status(400).json({
            success: false,
            message: error.message
        });    
    }
}

exports.resetPassword = async (req, res) => {
    try {
      const { token } = req.params; 
      const { password } = req.body; 
  
      
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiredAt: { $gt: Date.now() }, 
      });
  
      
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token",
        });
      }
  
    
      const hashedPassword = await bcryptjs.hash(password, 10);
      
      
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiredAt = undefined;
  
      
      await user.save();
  
      await sendResetSuccessEmail(user.email);

      res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      
      console.log("Error in resetPassword:", error.message);
  
    
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.checkAuth=async(req,res)=>{
    try{
       
        const user=await User.findById(req.userId).select("-password");
        if(!user){
            res.status(400).json({
                success: false,
                message:`user not found`,
              });
        }
        res.status(200).json({
            success: true,
            user
          });
    }
    catch(error){
        console.log("Error in AUTHcheck:", error.message);

        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  