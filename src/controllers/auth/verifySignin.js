import sendSuccessResponse from '../../utils/response/sendSuccessResponse.js';
import SEND_SANITIZED_SUCCESS_RESPONSE from '../../utils/response/sendSanitizedSuccessResponse.js';
import Users from '../../models/users/users.js';
import signJwtToken from '../../utils/signJWT.js';
import SendOtpWithNotification from '../../utils/SendOtpWithNotification.js';
import { JwtTokenUsageTypes, OtpTypes } from '../../constants/index.js';

async function verifySignin(req, res, next) {
    try {
        const { user } = req;

        const updatedUser = await Users.findByIdAndUpdate({ _id: user._id }, { emailVerified: true, tokenVersion: user.tokenVersion + 1 }, { new: true });
        const authToken = signJwtToken({ userId: updatedUser._id, tokenVersion: updatedUser.tokenVersion, usage: JwtTokenUsageTypes.Application });

        let message = 'Signin successful';
        if (!user.phoneVerfied) {
            await SendOtpWithNotification({ email: updatedUser.email, phoneNumber: updatedUser.phoneNumber, otpType: OtpTypes.VerifyMobile, onMobile: true, onEmail: false, resendOtp: false, templates: null });
            message = 'Signin successfully And otp sent On your mobile';
        }
        updatedUser.authToken = authToken
        return sendSuccessResponse(res, 200, true, message, 'Signin', SEND_SANITIZED_SUCCESS_RESPONSE(updatedUser));
    } catch (error) {
        next(error);
    }
    return false;
}

export default verifySignin;
