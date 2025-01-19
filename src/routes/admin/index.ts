import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize({ roles: ["ADMIN"] }));

router.get("/", (req, res) => {
  res.json("Welcome, Admin!");
});

export default router;
