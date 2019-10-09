const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.USER,
    clientId: process.env.CLIENT,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  }
});

const mailOptions = {
  from: 'FamilyDash',
  to: 'alecdown@gmail.com',
  subject: 'New Task Assigned',
  generateTextFromHTML: true,
  html: '<p> You have been assigned a new task </p>'
};

module.exports = {
  transporter,
  mailOptions
};
