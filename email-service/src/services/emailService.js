const nodemailer = require('nodemailer');
const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PWD = process.env.EMAIL_PWD;
const EMAIL_SERVICE = process.env.EMAIL_SERVICEז;

try{
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_ID,
      pass: EMAIL_PWD
    }
  });
} catch (error){
    console.error(error);
}

/**
 * Send Email.
 */
const sendEmail = (mailOptions, callback) => {
  try{
    return transporter.sendMail(mailOptions, callback);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
    sendEmail: sendEmail
}

