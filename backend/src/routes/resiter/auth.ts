import { Router } from "express";
import * as authMiddleware from "../../controllers/auth";
const router = Router();

router.post("/register", authMiddleware.register);

export default router;
