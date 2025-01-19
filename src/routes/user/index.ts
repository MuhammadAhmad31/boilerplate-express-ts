import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import {
  createStory,
  deleteStory,
  findStoriesByUserId,
  findStoryById,
  updateStory,
} from "../../controllers/user/upload.controller";
import { upload } from "../../config/lib/multer";

const router = Router();

router.use(authenticate);
router.use(authorize({ roles: ["USER"] }));

router.get("/", (req, res) => {
  res.json("Welcome, User!");
});

router.get("/story/:id", findStoryById);
router.get("/story/user/:id", findStoriesByUserId);
router.post("/story", upload.single("image"), createStory);
router.put("/story/:id", upload.single("image"), updateStory);
router.delete("/story/:id", deleteStory);

export default router;
