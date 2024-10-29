import { OtpTypes } from '../../constants/index.js';
import sendSuccessResponse from '../../utils/response/sendSuccessResponse.js';
import SendOtpWithNotification from '../../utils/SendOtpWithNotification.js';
import Users from '../../models/users/users.js';

async function VerifyEmail(req, res, next) {
    try {
        const { user } = req; // Destructure 't' from req object
        await Users.updateOne({ _id: user._id }, { $set: { emailVerified: true } });
        await SendOtpWithNotification({ email: user.email, phoneNumber: user.phoneNumber, otpType: OtpTypes.VerifyMobile, onMobile: true, onEmail: false, resendOtp: false, emailSubject: 'Verify Email', templates: null });
        const finalPayload = {
            email: user.email,
            emailVerified: true,
        };
        return sendSuccessResponse(res, 200, true, 'your email verified successfully And otp sent On your mobile', 'verifyEmail', finalPayload);
    } catch (error) {
        next(error);
    }
}

export default VerifyEmail;
