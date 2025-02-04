const express = require('express');
const nodemailer = require('nodemailer');
const Email = require('../models/emails');
const router = express.Router();
const cors = require('cors');
router.use(cors());
// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail SMTP service
  auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // Your app password
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

// Get all emails
router.get('/email', async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an email
router.delete('/email:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Email.findByIdAndDelete(id);
    res.status(200).json({ message: 'Email deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
