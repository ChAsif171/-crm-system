import setup from 'twilio';
import ENV from './keys.js';

const accountSid = ENV.TWILIO.ACCOUNT_SID;
const authToken = ENV.TWILIO.AUTH_TOKEN;
const client = setup(accountSid, authToken);

const sendMsg = async (otp, phoneNumber) => {
  try {
    const message = await client.messages.create({
      body: otp,
      from: ENV.TWILIO.FROM_NUMBER,
      to: phoneNumber,
    });
    return message;
  } catch (error) {
    return error;
  }
};
export default sendMsg;
