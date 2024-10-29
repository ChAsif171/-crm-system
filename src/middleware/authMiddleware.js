/* eslint-disable require-atomic-updates */
import { JwtTokenUsageTypes } from '../constants/index.js';
import logger from '../logger/index.js';
import { ApiError } from '../utils/error/ApiError.js';
import validateToken from '../utils/validateToken.js';

const authMiddleware = (model, usage = JwtTokenUsageTypes.Application) => {
    const authHandler = async (req, res, next) => {
        // get bearer token from header
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError('Access denied', 401, 'Please provide you auth token', true);
            }
            const getToken = validateToken(token);
            // console.log(getToken);
            if (!getToken.token && getToken?.message) {
                throw new ApiError('Access denied', 401, getToken?.message, true);
            }
            const { user: { usage: userProvidedTokenUsage } } = getToken;
            if (userProvidedTokenUsage !== usage) {
                throw new ApiError('Access denied', 401, 'Soory you dont have necessory permissions to perform this task', true);
            }

            let user = null;
            if (getToken.token) {
                user = await model.findOne({ _id: getToken.user.userId }).select('-__v -updatedAt');
                if (!user) {
                    throw new ApiError('Access denied', 401, 'User Not Found', true);
                }
            }

            if (user?.tokenVersion !== getToken.user.tokenVersion && usage === JwtTokenUsageTypes.Application) {
                throw new ApiError('session_expired', 401, 'outdated_jwt', true);
            }
            if (user?.isBlocked ?? false) {
                throw new ApiError('Access denied', 401, 'Your account is block, please contact support.', true);
            }
            if (user?.isDeleted ?? false) {
                throw new ApiError('Access denied', 401, 'Your account has been deleted, please contact support.', true);
            }
            req.user = user;
            req.jwtPayload = getToken.user;
            next();
        } catch (error) {
            next(error);
        }
    };
    return authHandler;
};

export default authMiddleware;
