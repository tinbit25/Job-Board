const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
require('dotenv').config();


const transport = Nodemailer.createTransport(
    MailtrapTransport({
      token: process.env.MAILTRAP_TOKEN
    })
  );
  

const sender = {
  address: "hello@demomailtrap.com",
  name: "Tinbite",
};

module.exports={sender ,transport}