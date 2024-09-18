require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 6000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Endpoint to send user info email to new admin user
app.post('/admin-user-info-email', async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log({ fullName, email, password });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Wild Vairagi</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #e0f7fa;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background-image: url('https://elhviuubpvhszmairpjb.supabase.co/storage/v1/object/sign/cabinImg/Snapchat_947162820.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbkltZy9TbmFwY2hhdF85NDcxNjI4MjAuanBnIiwiaWF0IjoxNzIwOTAyODc1LCJleHAiOjg2NTcyMDgxNjQ3NX0.WOEq9menKCprxxct4iCeQt-DwvtakK5vYSeEkU-CgCw&t=2024-07-13T20%3A34%3A37.185Z');
            background-size: cover;
            background-position: center;
            height: 150px;
            color: #fff;
            text-align: center;
            padding-top: 10px;
            padding-left: 5px;
            padding-right: 5px;
        }
        .header h1 {
            margin: 0;
            font-size: 30px;
            color: #08120c;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #00796b;
            margin-top: 0;
        }
        .button {
            display: inline-block;
            background-color: #00796b;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: -10px;
            float: right;
            margin-right: 10px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Wild Vairagi</h1>
        </div>
        <div class="content">
            <h2>Hello ${fullName},</h2>
            <p>We are excited to welcome you to the Wild Vairagi family. You will be managing our beautiful property in the serene Tirthan Valley. Below are your login details:</p>
            <p><strong>Username:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>To get started, please <a href="[Login URL]" class="button">Log In</a></p>
            <p>We look forward to working with you.</p>
            <p>Best regards,</p>
            <p>Sushain Sharma</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Wild Vairagi. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Welcome to Serve Wild Vairagi',
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send User Info email.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('New Admin user detailed email sent.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
