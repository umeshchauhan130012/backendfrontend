const express = require('express');
const nodemailer = require('nodemailer');
const Email = require('../models/emails');
const router = express.Router();
const cors = require('cors');
router.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
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
      await transporter.sendMail({
          from: process.env.SMTP_USER,
          to,                        
          subject,                
          text: message,       
      });
      const emailModel = new Email({ to, subject, message });
      await emailModel.save();
      res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
  }
});


module.exports = router;
