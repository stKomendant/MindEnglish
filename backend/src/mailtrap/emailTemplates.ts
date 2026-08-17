// export const VERIFICATION_EMAIL_TEMPLATE = `
// <!DOCTYPE html>
// <html>
// <head>
// <style>
//   body {
//     font-family: 'Segoe UI', Arial, sans-serif;
//     background: #f0f2f5;
//     margin: 0;
//     padding: 40px 20px;
//   }

//   .container {
//     max-width: 520px;
//     margin: auto;
//     background: #ffffff;
//     border-radius: 12px;
//     overflow: hidden;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//   }

//   .header {
//     background: linear-gradient(135deg, #4CAF50, #2E7D32);
//     padding: 30px;
//     text-align: center;
//   }

//   .header h1 {
//     color: #ffffff;
//     margin: 0;
//     font-size: 26px;
//     letter-spacing: 1px;
//   }

//   .body {
//     padding: 35px 30px;
//   }

//   .body p {
//     color: #444;
//     font-size: 15px;
//     line-height: 1.6;
//     margin: 0 0 20px;
//   }

//   .code-box {
//     background: #f5f9f5;
//     border: 2px dashed #4CAF50;
//     border-radius: 8px;
//     padding: 20px;
//     text-align: center;
//     margin: 25px 0;
//   }

//   .code {
//     font-size: 36px;
//     font-weight: bold;
//     color: #2E7D32;
//     letter-spacing: 6px;
//   }

//   .expire {
//     color: #888;
//     font-size: 13px;
//     text-align: center;
//     margin-top: 10px;
//   }

//   .footer {
//     background: #fafafa;
//     padding: 20px 30px;
//     text-align: center;
//     border-top: 1px solid #eee;
//   }

//   .footer p {
//     color: #999;
//     font-size: 12px;
//     margin: 0;
//   }
// </style>
// </head>

// <body>
//   <div class="container">
//     <div class="header">
//       <h1>English Mind</h1>
//     </div>

//     <div class="body">
//       <p>Hello,</p>
//       <p>Thank you for signing up! Please use the verification code below to confirm your email address and activate your account.</p>

//       <div class="code-box">
//         <div class="code">{verificationCode}</div>
//       </div>

//       <p class="expire">This code expires in 15 minutes.</p>
//       <p>If you didn't create an account with English Mind, you can safely ignore this email.</p>
//     </div>

//     <div class="footer">
//       <p>&copy; ${new Date().getFullYear()} English Mind. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;

// export const PASSWORD_RESET_TEMPLATE = `
// <!DOCTYPE html>
// <html>
// <head>
// <style>
//   body {
//     font-family: 'Segoe UI', Arial, sans-serif;
//     background: #f0f2f5;
//     margin: 0;
//     padding: 40px 20px;
//   }

//   .container {
//     max-width: 520px;
//     margin: auto;
//     background: #ffffff;
//     border-radius: 12px;
//     overflow: hidden;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//   }

//   .header {
//     background: linear-gradient(135deg, #1976D2, #0D47A1);
//     padding: 30px;
//     text-align: center;
//   }

//   .header h1 {
//     color: #ffffff;
//     margin: 0;
//     font-size: 26px;
//     letter-spacing: 1px;
//   }

//   .body {
//     padding: 35px 30px;
//   }

//   .body p {
//     color: #444;
//     font-size: 15px;
//     line-height: 1.6;
//     margin: 0 0 20px;
//   }

//   .button-box {
//     text-align: center;
//     margin: 25px 0;
//   }

//   .button {
//     display: inline-block;
//     background: #1976D2;
//     color: #ffffff !important;
//     font-weight: bold;
//     text-decoration: none;
//     padding: 14px 32px;
//     border-radius: 8px;
//   }

//   .expire {
//     color: #888;
//     font-size: 13px;
//     text-align: center;
//     margin-top: 10px;
//   }

//   .warning {
//     background: #fff8e1;
//     border-left: 4px solid #FFA000;
//     padding: 12px 16px;
//     border-radius: 4px;
//     margin: 20px 0;
//   }

//   .warning p {
//     color: #6d5e00;
//     font-size: 13px;
//     margin: 0;
//   }

//   .footer {
//     background: #fafafa;
//     padding: 20px 30px;
//     text-align: center;
//     border-top: 1px solid #eee;
//   }

//   .footer p {
//     color: #999;
//     font-size: 12px;
//     margin: 0;
//   }
// </style>
// </head>

// <body>
//   <div class="container">
//     <div class="header">
//       <h1>English Mind</h1>
//     </div>

//     <div class="body">
//       <p>Hello,</p>
//       <p>We received a request to reset your password. Click the button below to set a new password for your account.</p>

//       <div class="button-box">
//         <a class="button" href="{resetURL}">Reset Password</a>
//       </div>

//       <p class="expire">This link expires in 1 hour.</p>

//       <div class="warning">
//         <p>If you didn't request a password reset, please ignore this email. Your account remains secure.</p>
//       </div>
//     </div>

//     <div class="footer">
//       <p>&copy; ${new Date().getFullYear()} English Mind. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;

// export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
// <!DOCTYPE html>
// <html>
// <head>
// <style>
//   body {
//     font-family: 'Segoe UI', Arial, sans-serif;
//     background: #f0f2f5;
//     margin: 0;
//     padding: 40px 20px;
//   }

//   .container {
//     max-width: 520px;
//     margin: auto;
//     background: #ffffff;
//     border-radius: 12px;
//     overflow: hidden;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//   }

//   .header {
//     background: linear-gradient(135deg, #1976D2, #0D47A1);
//     padding: 30px;
//     text-align: center;
//   }

//   .header h1 {
//     color: #ffffff;
//     margin: 0;
//     font-size: 26px;
//     letter-spacing: 1px;
//   }

//   .body {
//     padding: 35px 30px;
//   }

//   .body p {
//     color: #444;
//     font-size: 15px;
//     line-height: 1.6;
//     margin: 0 0 20px;
//   }

//   .warning {
//     background: #fff8e1;
//     border-left: 4px solid #FFA000;
//     padding: 12px 16px;
//     border-radius: 4px;
//     margin: 20px 0;
//   }

//   .warning p {
//     color: #6d5e00;
//     font-size: 13px;
//     margin: 0;
//   }

//   .footer {
//     background: #fafafa;
//     padding: 20px 30px;
//     text-align: center;
//     border-top: 1px solid #eee;
//   }

//   .footer p {
//     color: #999;
//     font-size: 12px;
//     margin: 0;
//   }
// </style>
// </head>

// <body>
//   <div class="container">
//     <div class="header">
//       <h1>English Mind</h1>
//     </div>

//     <div class="body">
//       <p>Hello,</p>
//       <p>Your password has been reset successfully.</p>

//       <div class="warning">
//         <p>If you didn't make this change, please contact us immediately.</p>
//       </div>
//     </div>

//     <div class="footer">
//       <p>&copy; ${new Date().getFullYear()} English Mind. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;

// export const WELCOME_EMAIL_TEMPLATE = `
// <!DOCTYPE html>
// <html>
// <head>
// <style>
//   body {
//     font-family: 'Segoe UI', Arial, sans-serif;
//     background: #f0f2f5;
//     margin: 0;
//     padding: 40px 20px;
//   }

//   .container {
//     max-width: 520px;
//     margin: auto;
//     background: #ffffff;
//     border-radius: 12px;
//     overflow: hidden;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//   }

//   .header {
//     background: linear-gradient(135deg, #4CAF50, #2E7D32);
//     padding: 40px 30px;
//     text-align: center;
//   }

//   .header h1 {
//     color: #ffffff;
//     margin: 0 0 8px;
//     font-size: 28px;
//     letter-spacing: 1px;
//   }

//   .header p {
//     color: rgba(255,255,255,0.9);
//     margin: 0;
//     font-size: 15px;
//   }

//   .body {
//     padding: 35px 30px;
//   }

//   .body p {
//     color: #444;
//     font-size: 15px;
//     line-height: 1.7;
//     margin: 0 0 18px;
//   }

//   .greeting {
//     font-size: 20px;
//     font-weight: 600;
//     color: #2E7D32;
//     margin-bottom: 15px;
//   }

//   .features {
//     background: #f5f9f5;
//     border-radius: 8px;
//     padding: 20px 25px;
//     margin: 25px 0;
//   }

//   .features h3 {
//     color: #2E7D32;
//     margin: 0 0 15px;
//     font-size: 16px;
//   }

//   .feature-item {
//     display: flex;
//     align-items: center;
//     margin-bottom: 12px;
//     font-size: 14px;
//     color: #555;
//   }

//   .feature-item:last-child {
//     margin-bottom: 0;
//   }

//   .check {
//     color: #4CAF50;
//     font-size: 18px;
//     margin-right: 10px;
//     font-weight: bold;
//   }

//   .divider {
//     height: 1px;
//     background: #eee;
//     margin: 25px 0;
//   }

//   .footer {
//     background: #fafafa;
//     padding: 20px 30px;
//     text-align: center;
//     border-top: 1px solid #eee;
//   }

//   .footer p {
//     color: #999;
//     font-size: 12px;
//     margin: 0;
//   }
// </style>
// </head>

// <body>
//   <div class="container">
//     <div class="header">
//       <h1>English Mind</h1>
//       <p>Your journey to mastering English starts now</p>
//     </div>

//     <div class="body">
//       <p class="greeting">Welcome, {name}!</p>
//       <p>Your email has been verified and your account is ready to go. We're excited to have you join the English Mind community.</p>

//       <div class="features">
//         <h3>What you can do:</h3>
//         <div class="feature-item">
//           <span class="check">&#10003;</span>
//           <span>Practice vocabulary and grammar exercises</span>
//         </div>
//         <div class="feature-item">
//           <span class="check">&#10003;</span>
//           <span>Track your learning progress</span>
//         </div>
//         <div class="feature-item">
//           <span class="check">&#10003;</span>
//           <span>Get personalized study recommendations</span>
//         </div>
//       </div>

//       <div class="divider"></div>

//       <p>If you have any questions or need help getting started, don't hesitate to reach out. We're here to support your learning journey.</p>

//       <p>Happy learning!<br><strong>The English Mind Team</strong></p>
//     </div>

//     <div class="footer">
//       <p>&copy; ${new Date().getFullYear()} English Mind. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;
