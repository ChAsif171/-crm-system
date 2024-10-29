import express from 'express';
import user from './user.js';
import payment from './payment.js';
import role from './roles.js';
import permissions from './permissions.js';
import AdminSignin from '../models/adminSignin.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.use('/users', user);
router.use('/payment', payment);
router.use('/roles', authMiddleware(AdminSignin), role);
router.use('/permissions', authMiddleware(AdminSignin), permissions);

export default router;
