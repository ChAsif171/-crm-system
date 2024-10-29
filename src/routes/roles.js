import express from "express";
import { createRole, getRoles, updateRole, deleteRole } from "../controllers/role/index.js";
import { Permissions } from "../constants/index.js";
import checkPermission from "../middleware/checkPermission.js";

const router = express.Router();

router.post("/", checkPermission(Permissions.createRole), createRole);
router.get("/", checkPermission(Permissions.getRole), getRoles);
router.put("/", checkPermission(Permissions.editRole), updateRole);
router.delete("/", checkPermission(Permissions.deleteRole), deleteRole);

export default router;
