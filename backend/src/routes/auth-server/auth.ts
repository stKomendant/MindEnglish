import { Router } from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checAuth,
} from "../../controllers/Auth/auth";

import { verifyToken } from "../../middlewares/verifyToken";
const router = Router();

router.get("/check-auth", verifyToken, checAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
