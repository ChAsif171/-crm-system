import moment from 'moment';
import logger from '../../logger/index.js';
import getAge from '../../utils/getAge.js';
import { ApiError } from '../../utils/error/ApiError.js';
import signupAggregationMatchUser from '../../pipes/signupAggregationMatchUser.js';
import Users from '../../models/users.js';
import { JwtTokenUsageTypes, OtpTypes } from '../../constants/index.js';
import signJwtToken from '../../utils/signJWT.js';
import SEND_SANITIZED_SUCCESS_RESPONSE from '../../utils/response/sendSanitizedSuccessResponse.js';
import SendOtpWithNotification from '../../utils/SendOtpWithNotification.js';
import sendSuccessResponse from '../../utils/response/sendSuccessResponse.js';

async function Signup(req, res, next) {
    try {
        const { email, dateOfBirth, phoneNumber } = req.body;
        const age = getAge(dateOfBirth);
        if (age < 18) {
            throw new ApiError('Invalid Details', 400, 'Age must be greater then 18', true);
        }
        const currentUserDetails = { email: email.toLowerCase(), phoneNumber };
        const queryAggregation = signupAggregationMatchUser(currentUserDetails);
        const isUnique = await Users.aggregate(queryAggregation);
        const [message] = isUnique;
        if (message?.error) {
            const { email: regEmail, phoneNumber: regPhone } = message;
            let msg = '';
            if (regEmail) msg += `Provided email already exists: ${regEmail}. `;
            if (regPhone) msg += `Provided phoneNumber already exists: ${regPhone}.`;
            throw new ApiError('Invalid Details', 400, msg.trim(), true);
        }
        const userData = {
            ...req.body,
        };

        const newUser = new Users(userData);
        if (!newUser) {
            throw new ApiError('Db Error', 500, 'Something went wrong', true);
        }
        try {
            await newUser.save();
        } catch (error) {
            throw new ApiError('db error', 400, error.message, true);
        }

        const jwtPayload = {
            userId: newUser._id,
            tokenVersion: 0,
            createdAt: moment(),
            usage: JwtTokenUsageTypes.Application,
        };
        const token = signJwtToken(jwtPayload);
        const sanitizedUser = SEND_SANITIZED_SUCCESS_RESPONSE(newUser);
        sanitizedUser.token = token;

        // send email
        await SendOtpWithNotification({ email: newUser.email, phoneNumber: userData.phoneNumber, otpType: OtpTypes.VerifyEmail, onMobile: false, onEmail: true, emailSubject: "Verify Email", templates: null });

        logger.info(`${email} SignUp transaction completed`);
        return sendSuccessResponse(res, 201, true, 'User registered successfully', 'registerUser', sanitizedUser);
    } catch (error) {
        next(error);
    }
}

export default Signup;
