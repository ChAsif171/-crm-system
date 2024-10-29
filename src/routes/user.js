import express from "express";
import User from '../models/users.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateUserInputs from '../middleware/validateUserInputs.js';
import VerifyOtpMiddleware from '../middleware/verifyOtpMiddleWare.js';
import { EmailSchema, OtpSchema, PasswordConfirmPasswordSchema, UserSignupSchema, SignInSchema, PhoneSchema } from '../constants/usersJoiSchemas.js';
import { signup, verifyEmail, verifyPhoneNumber, login, verifySignin } from '../controllers/auth/index.js';

const router = express.Router();


router.post('/signup', validateUserInputs(UserSignupSchema), signup);
router.post('/verify-email', validateUserInputs(OtpSchema), authMiddleware(User), VerifyOtpMiddleware, verifyEmail);
router.post('/verify-phonenumber', validateUserInputs(PhoneSchema), authMiddleware(User), VerifyOtpMiddleware, verifyPhoneNumber);
router.post('/login', validateUserInputs(SignInSchema), login);
router.post('/verify-signin', validateUserInputs(EmailSchema), authMiddleware(User), VerifyOtpMiddleware, verifySignin);

export default router;
