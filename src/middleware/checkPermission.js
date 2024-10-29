import mongoose from "mongoose";
import { ApiError } from "../utils/error/ApiError.js";
import adminSignin from "../models/adminSignin.js"

const checkPermission = (requiredPermission) => {
    const permission = async (req, res, next) => {
        try {
            const role = req.user;
            if (!role) throw new ApiError("Invalid Credentials", 400, "you can not access this api", true);
            const roles = await adminSignin.find({ _id: role._id }).populate({ path: "role", options: { strictPopulate: false } });
            if (roles[0]?.role?.name !== "admin") {
                const permissionObjectId = new mongoose.Types.ObjectId(requiredPermission);
                const findPermission = roles[0]?.role?.permissions?.includes(permissionObjectId);
                if (!findPermission) throw new ApiError("Invalid Credentials", 400, "you can not access this api", true);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
    return permission;
};
export default checkPermission;
