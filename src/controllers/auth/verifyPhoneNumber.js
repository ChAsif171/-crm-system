import { ApiError } from '../../utils/error/ApiError.js';
import sendSuccessResponse from '../../utils/response/sendSuccessResponse.js';
import Users from '../../models/users/users.js';

async function VerifyPhoneNumber(req, res, next) {
    try {
        const { user } = req;

        if (!user.emailVerified) throw new ApiError('Invalid oboardind flow', 400, 'Please verify your email first', true);
        // now update the user
        await Users.updateOne({ _id: user._id }, { $set: { phoneNumberVerified: true } });
        const finalPayload = {
            phoneNumber: user.phoneNumber,
            phoneNumberVerified: true,
        };
        return sendSuccessResponse(res, 200, true, 'your phonenumber verified successfully', 'verifyPhonenumber', finalPayload);
    } catch (error) {
        next(error);
    }
}

export default VerifyPhoneNumber;
