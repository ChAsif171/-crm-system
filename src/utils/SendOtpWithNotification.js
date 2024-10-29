/* eslint-disable no-param-reassign */
/* eslint-disable require-atomic-updates */
import otpGenerator from './otpGenerator.js';
import getEmailSubject from './getEmailSubjects.js';
import { ExpirySeconds } from '../constants/index.js';
import redisClient from '../config/redis.js';
import sendEmailOrMessage from './sendEmailOrMessage.js';
import setToCache from './cache/setToCache.js';
import getFromCache from './cache/getFromCache.js';
import logger from '../logger/index.js';

const createFinalMessage = (otpType, onEmail, onMobile) => {
    let finalMessage = 'A ';
    const email = 'Email';
    const message = 'Mobile';
    const hasBeenSent = 'has been successfully sent ';
    const otpSent = '(OTP) has been successfully sent ';
    const onBoth = 'to your email and mobile.';
    const onlyOnEmail = 'to your email.';
    const onlyOnMobile = 'to your mobile.';

    if (otpType && onEmail && onMobile) {
        finalMessage += `${otpSent} ${onBoth}`;
    } else if (otpType && onEmail) {
        finalMessage += `${otpSent} ${onlyOnEmail}`;
    } else if (otpType && onMobile) {
        finalMessage += `${otpSent} ${onlyOnMobile}`;
    } else if (!otpType && onEmail && onMobile) {
        finalMessage += `${email} and ${message} ${onBoth}`;
    } else if (!otpType && onEmail) {
        finalMessage += `${email} ${hasBeenSent} ${onlyOnEmail}`;
    } else if (!otpType && onMobile) {
        finalMessage += `${message} ${hasBeenSent} ${onlyOnMobile}`;
    } else {
        finalMessage += 'Notification has been sent successfully.';
    }
    return finalMessage;
};

const SendOtpWithNotification = async ({ email, phoneNumber, otpType, onMobile = false, onEmail = false, resendOtp = false,emailSubject, templates }) => {
    try {
        const otp = otpGenerator();
        logger.info(`OTP :: ${otp}`);
        logger.info(`OTP_TYPE :: ${otpType}`);
        // if the otp is requested for multiple time within 30 sec,
        const checkUserOtpExpiry = await redisClient.ttl(`otp:${email?.toLowerCase()}`);
        const otpExpiry = ExpirySeconds.m10;
        const reSendRemainingTime = otpExpiry - 30;
        if (resendOtp && checkUserOtpExpiry > reSendRemainingTime) {
            const otpData = await getFromCache(`otp:${email.toLowerCase()}`);
            if (otpData.type === otpType) {
                return {
                    success: false,
                    message: checkUserOtpExpiry - reSendRemainingTime,
                };
            }
        }
        const otpData = {
            otp,
            type: otpType,
        };

        await setToCache(`otp:${email.toLowerCase()}`, otpData, otpExpiry);
        sendEmailOrMessage({ onMobile, onEmail, email, phoneNumber, otp, emailSubject, templates });

        return {
            success: true,
            message: createFinalMessage(otpType, onEmail, onMobile),
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export default SendOtpWithNotification;
