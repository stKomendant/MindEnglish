import { Router } from "express";
import { signup, login, logout, checAuth} from "../../controllers/Auth/auth";
import {verifyEmail} from "../../controllers/Auth/emailVerification"
import { forgotPassword, resetPassword } from "../../controllers/Auth/passwordReset";
import { updateUsername, changePassword, deleteAccount } from "../../controllers/Auth/profile";

import { verifyToken } from "../../middlewares/verifyToken";
const router = Router();

router.get("/check-auth", verifyToken, checAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.patch("/username", verifyToken, updateUsername);
router.patch("/password", verifyToken, changePassword);
router.delete("/account", verifyToken, deleteAccount);

export default router;
