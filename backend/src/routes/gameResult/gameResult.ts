import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { createGameResult, getGameResults } from "../../controllers/GameResult/gameResult";

const router = Router();

router.post("/", verifyToken, createGameResult);
router.get("/", verifyToken, getGameResults);

export default router;