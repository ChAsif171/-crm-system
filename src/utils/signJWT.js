import jwt from 'jsonwebtoken';
import ENV from '../config/keys.js';

function signJwtToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, ENV.JWT_SECRET, {
        expiresIn,
    });
}
export default signJwtToken;
