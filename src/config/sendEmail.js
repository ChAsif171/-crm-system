import sendGrid from '@sendgrid/mail';
import ENV from './keys.js';

sendGrid.setApiKey(ENV.SENDGRID.API_SECRET);

const sendEmail = (email, subject, otp) => {
  const msg = {
    to: email,
    from: {
      name: 'CRM System',
      email: ENV.SENDGRID.FROM,
    },
    subject,
    html: otp,
    text: 'CRM-System Otp',
  };
  return sendGrid.send(msg);
};

export default sendEmail;
