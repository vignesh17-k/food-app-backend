const express = require("express");
const expressAsyncHandler = require("express-async-handler");

const router = express.Router();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message || !subject) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }

    const result = await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 12px; margin-top: 0;">
            New Contact Request
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 0; color: #555; font-weight: bold; width: 100px;">Name</td>
              <td style="padding: 10px 0; color: #222;">${name}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px 0; color: #555; font-weight: bold;">Email</td>
              <td style="padding: 10px 0; color: #222;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #555; font-weight: bold;">Subject</td>
              <td style="padding: 10px 0; color: #222;">${subject}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px 0; color: #555; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #222; white-space: pre-line;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            This message was sent via the contact form on your website.
          </p>
        </div>
      `,
    });

    if (result?.accepted?.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "Contact form submitted successfully",
      });
    } else {
      return res?.status(400).json({
        status: 400,
        message: "Failed to submit contact form",
      });
    }

  }),
);

module.exports = router;
