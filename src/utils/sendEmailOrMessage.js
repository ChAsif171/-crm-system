import notificationsQueue from '../queues/notificationQueue.js';

const defaultEmailTemplate = (otp) => {
    const msg = `<h1>Your one-time verification code is ${otp}.</h1>`;
    return msg;
};
const defaultMobileOtpMessage = (otp) => {
    const msg = `Your one-time verification code is ${otp}.`;
    return msg;
};

const defaultEmailSubject = 'crm-system verification code';

const sendEmailOrMessage = ({ onMobile = false, onEmail = false, email, phoneNumber, otp, emailSubject = defaultEmailSubject, templates }) => {
    try {
        let { emailTemplate = defaultEmailTemplate, mobileOtpMessage = defaultMobileOtpMessage } = templates || {};
        if (!emailTemplate) emailTemplate = defaultEmailTemplate; // if emailTemplate is not provided or its false, use defaultEmailTemplate
        if (!mobileOtpMessage) mobileOtpMessage = defaultMobileOtpMessage; // if mobileOtpMessage is not provided or its false, use defaultMobileOtpMessage
        if (onEmail) {
            notificationsQueue.add('email', {
                email,
                subject: emailSubject,
                message: emailTemplate(otp),
            }, {
                attempts: 3,
                backoff: {
                    type: 'fixed',
                    delay: 5000,
                },
            });
        }
        if (onMobile) {
            notificationsQueue.add('sms', {
                phoneNumber,
                message: mobileOtpMessage(otp),
            }, {
                attempts: 3,
                backoff: {
                    type: 'fixed',
                    delay: 5000,
                },
            });
        }

        return [onEmail, onMobile];
    } catch (error) {
        throw new Error(error);
    }
};

export default sendEmailOrMessage;
