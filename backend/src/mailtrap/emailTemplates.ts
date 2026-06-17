export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial;
    background: #f5f5f5;
    padding: 20px;
  }

  .container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
  }

  .code {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: #4CAF50;
  }
</style>
</head>

<body>
  <div class="container">
    <h1>MindEnglish</h1>

    <p>Please verify your account.</p>

    <div class="code">
      {verificationCode}
    </div>

    <p>This code expires in 15 minutes.</p>
  </div>
</body>
</html>
`;
