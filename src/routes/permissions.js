import express from "express";
import { createPermession, getPermission, checkPermission } from "../controllers/permissions/index.js"
import { Permissions } from "../constants/index.js";

const router = express.Router();

router.get("/testPermissions", (req, res) => { res.json({ message: "permissions called" }).status(200) });
router.post("/createPermession", createPermession);
router.get("/getPermission", checkPermission(Permissions.getPermessions), getPermission);


export default router;

