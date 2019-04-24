"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'michaelrs.mailer@gmail.com', // generated ethereal user
      pass: process.env.GOOGLE_EMAIL_PASS // generated ethereal password
    }
});




module.exports = transporter
// verify connection configuration
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });
  