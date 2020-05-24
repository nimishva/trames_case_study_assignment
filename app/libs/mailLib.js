const sgMail = require('@sendgrid/mail');

let sendMail = (mailTo,otp)=>{


sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: mailTo,
  from: 'nimish.v@rediffmail.com',
  subject: 'OTP ',
  html: `<strong>Hello,</strong>
  <br><br>
  Your One Time Password is
  <br>
  <strong>${otp}</strong>
  <br><br>
  Regards<br>
  Team Resfeber </strong>`,
};

     return sgMail.send(msg)


   // return response;

}// End of Mail Library

module.exports = {
    sendMail:sendMail
}

