const nodemailer = require("nodemailer")

const Emailverification = async (email, username, link) =>{
    const messageTemplate = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #333;
      margin: 0;
      padding: 0;
    }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .logo {
      text-align: center;
      margin-bottom: 25px;
    }
    .logo img {
      width: 100px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 15px;
      color: #1f2937;
    }
    .message {
      font-size: 16px;
      color: #4b5563;
      line-height: 1.6;
      text-align: center;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      padding: 14px 35px;
      background: linear-gradient(135deg, #ef4444, #f87171);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 15px;
      margin: 0 auto 35px auto;
      text-align: center;
    }
    .button:hover {
      background: linear-gradient(135deg, #dc2626, #ef4444);
    }
    .footer {
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
      line-height: 1.6;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Logo -->

    <!-- Title -->
    <div class="title">Verify Your Email</div>

    <!-- Message -->
    <div class="message">
      Hi <strong>${username}</strong>,<br /><br />
      Thanks for joining <strong>Taskify</strong>!<br />
      Please confirm your email address by clicking the button below:
    </div>

    <!-- CTA Button -->
    <div style="text-align:center;">
      <a href="${link}" class="button">Confirm Email</a>
    </div>

    <!-- Secondary Message -->
    <div class="message" style="font-size:14px; color:#6b7280;">
      Didn’t create an account? Just ignore this email.
    </div>

    <!-- Footer -->
    <div class="footer">
      © 2025 SQI. All rights reserved.<br />
      This is an automated message — please do not reply.
    </div>
  </div>
</body>
</html>
    `
      const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASS
        }
      })

      const mailOptions = {
        from:process.env.USER_EMAIL,
        to: email,
        subject: "Email Verification",
        html: messageTemplate
      }

      try {
        const deliveredmail =  await transporter.sendMail(mailOptions)
        if(deliveredmail){
            return "mail sent"
        }
      } catch (error) {
        console.log(error);
        
      }
}


module.exports = Emailverification