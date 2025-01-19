import { Router } from "express";
import admin from "./admin/index";
import login from "./auth/index";
import user from "./user/index";
const router = Router();

router.use("/", login);
router.use("/admin", admin);
router.use("/user", user);

export default router;
