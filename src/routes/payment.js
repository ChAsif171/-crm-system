import express from "express";
import User from '../models/users.js';
import AdminSignin from '../models/adminSignin.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateUserInputs from '../middleware/validateUserInputs.js';
import { userIdSchema } from '../../constants/usersJoiSchemas.js';
import { stripePaymentSuccess, getSubscriptions } from "../controllers/payment/index.js";
import { checkPermission } from "../controllers/permissions/index.js"
import { Permissions } from "../constants/index.js";

const router = express.Router();

router.post('/payment-success', validateUserInputs(userIdSchema, 'query'), authMiddleware(User), checkPermission(Permissions.payment), stripePaymentSuccess);
router.get('/get-subscriptions', authMiddleware(User), checkPermission(Permissions.payment), getSubscriptions);

router.post('/admin-payment-success', validateUserInputs(userIdSchema, 'query'), authMiddleware(AdminSignin), checkPermission(Permissions.payment), stripePaymentSuccess);
router.get('/admin-get-subscriptions', authMiddleware(AdminSignin), checkPermission(Permissions.payment), getSubscriptions);

export default router;
