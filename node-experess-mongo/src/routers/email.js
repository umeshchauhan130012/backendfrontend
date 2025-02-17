const express = require('express');
const nodemailer = require('nodemailer');
const Email = require('../models/emails');
const router = express.Router();
const cors = require('cors');
router.use(cors());
// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // false for TLS, true for SSL (port 465)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/email', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      // Send email
      await transporter.sendMail({
          from: process.env.SMTP_USER, // Your Gmail ID
          to,                          // Recipient's email
          subject,                     // Email subject
          text: message,               // Plain text email body
      });

      // Respond with success
      res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
  }
});


module.exports = router;
