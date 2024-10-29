import { ApiError } from '../utils/error/ApiError.js';
import { OtpTypes } from '../constants/index.js';
import getFromCache from '../utils/cache/getFromCache.js';
import deleteFromCache from '../utils/cache/deleteFromCache.js';

function getOtpType(url) {
    const getTheEndpointname = url.split('/').at(-1);
    let otpType = '';
    switch (getTheEndpointname) {
        case 'verify-email':
            otpType = OtpTypes.VerifyEmail;
            break;
        case 'verify-phonenumber':
            otpType = OtpTypes.VerifyMobile;
            break;
        case 'forget-password-email':
            otpType = OtpTypes.ForgetPasswordEmail;
            break;
        case 'forget-password-number':
            otpType = OtpTypes.ForgetPasswordNumber;
            break;
        case 'verify-signin':
            otpType = OtpTypes.SignIn;
            break;
        default:
            break;
    }
    return otpType;
}

async function VerifyOtpMiddleware(req, res, next) {
    try {
        const { user, body: { otp } } = req;
        const typeOfOtp = getOtpType(req.originalUrl);
        if (user.emailVerified && typeOfOtp === OtpTypes.VerifyEmail) throw new ApiError('already verified', 400, 'Email Already Verified', true);
        if (user.mobileVerified && typeOfOtp === OtpTypes.VerifyMobile) throw new ApiError('already verified', 400, 'Mobile Number Already Verified', true);
        const key = `otp:${user.email?.toLowerCase()}`;
        const userOtpData = await getFromCache(key);
        if (!userOtpData) throw new ApiError('Invalid Details', 400, 'Otp is either expired or not generated', true);
        if (userOtpData.otp !== otp) throw new ApiError('Invalid Details', 400, 'OTP is invalid!', true);
        if (userOtpData.type !== typeOfOtp) throw new ApiError('Invalid request :: OTP cross-usage', 400, `You can't use this OTP to verify ${typeOfOtp}`);
        await deleteFromCache(key);
        next();
    } catch (error) {
        next(error);
    }
}

export default VerifyOtpMiddleware;
