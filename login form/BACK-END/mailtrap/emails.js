const Nodemailer = require("nodemailer");
const { sender, transport } = require('./mailtra.config');
const {PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE } = require("./emailTemplates");

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    console.log("Sending email to:", email);

    const mailOptions = {
      from: sender,
      to: email,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };

    const response = await transport.sendMail(mailOptions); 
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification email to ${email}:`, error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    console.log("Sending welcome email to:", email);
    console.log("Recipient name:", name);

    const mailOptions = {
      from: sender,
      to: email,
      subject: "Welcome to Our Service",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: #007bff;
                    color: white;
                    padding: 10px 0;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 0.9em;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome, ${name}!</h1>
                </div>
                <p>Thank you for registering with us! We are excited to have you on board.</p>
                <p>If you have any questions, feel free to reach out to us anytime.</p>
                <div class="footer">
                    <p>Best Regards,</p>
                    <p>Your Company Name</p>
                </div>
            </div>
        </body>
        </html>
      `
    };

    const response = await transport.sendMail(mailOptions); 
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email to ${email}:`, error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};
const sendPasswordResetEmail=async(email,resetURL)=>{
  recipient=[{email}]
  try {
    console.log("Sending email to:", email);

    const mailOptions = {
      from: sender,
      to: email,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category:"Password Reset"
    };

    const response = await transport.sendMail(mailOptions); 
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending Password Reset Email to ${email}:`, error);
    throw new Error(`Error sending Password Reset Email: ${error.message}`);
  }
};
const sendResetSuccessEmail=async(email)=>{
  recipient=[{email}]
  try {
    console.log("Sending email to:", email);

    const mailOptions = {
      from: sender,
      to: email,
      subject: "Password Reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category:"Password Reset"
    };

    const response = await transport.sendMail(mailOptions); 
    console.log("Password reset successfully", response);
  } catch (error) {
    console.error(`Error in reset password ${email}:`, error);
    throw new Error(`Error in reset password: ${error.message}`);
  }
};
module.exports = { sendVerificationEmail, sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail};
