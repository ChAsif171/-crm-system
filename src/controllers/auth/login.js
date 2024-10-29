import Users from '../../models/users/users.js';
import { ApiError } from '../../utils/error/ApiError.js';
import signJwtToken from '../../utils/signJWT.js';
import { JwtTokenUsageTypes, OtpTypes } from '../../constants/index.js';
import sendSuccessResponse from '../../utils/response/sendSuccessResponse.js';
import SendOtpWithNotification from '../../utils/SendOtpWithNotification.js';

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const userExists = await Users.findOne({ email: email.toLowerCase() });
        if (!userExists) throw new ApiError('Invalid Credentials', 400, 'email or password is incorrect', true);
        const userVerified = await userExists.bcryptComparePassword(password);
        if (!userVerified) {
            throw new ApiError('Invalid Credentials', 400, 'email or password is incorrect', true);
        }
        await SendOtpWithNotification({ email, phoneNumber: userExists.phoneNumber, otpType: OtpTypes.SignIn, onMobile: false, onEmail: true, resendOtp: false, templates: null });
        const jwtPayload = {
            userId: userExists._id,
            tokenVersion: userExists.tokenVersion,
            usage: JwtTokenUsageTypes.verifySignin,
        };
        const token = signJwtToken(jwtPayload);
        return sendSuccessResponse(res, 200, true, 'Signin Successful and OTP sent', 'signin', { auth_token: token });
    } catch (error) {
        next(error);
    }
}

export default login;
