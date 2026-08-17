import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { getAchievements } from "../../controllers/Achievement/achievement";

const router = Router();

router.get("/", verifyToken, getAchievements);

export default router;