"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checAuth = exports.resetPassword = exports.forgotPassword = exports.logout = exports.login = exports.verifyEmail = exports.signup = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../lib/prisma");
const generateTokenAndSetCookie_1 = require("../utils/generateTokenAndSetCookie");
const emails_1 = require("../mailtrap/emails");
const signup = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        if (!email || !password || !username) {
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (userAlreadyExists) {
            return res.status(400).json({
                message: "user already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                verificationToken: verificationCode,
                verificationTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
            },
        });
        // jwt
        (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, user.id);
        await (0, emails_1.sendVerificationEmail)(user.email, verificationCode);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to send verification email" });
    }
};
exports.signup = signup;
const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                verificationToken: code,
                verificationTokenExpiresAt: { gt: new Date() },
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid or expired verification code",
            });
        }
        await prisma_1.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                verificationToken: null,
                verificationTokenExpiresAt: null,
                isVerified: true,
            },
        });
        await (0, emails_1.sendWelcomeEmail)(user.email, user.username);
        res.status(201).json({
            success: true,
            message: "Email verified successfully",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error something went wrong try again later",
            success: false,
        });
    }
};
exports.verifyEmail = verifyEmail;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid credentials", success: false });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ message: "Invalid credentials", success: false });
        }
        await prisma_1.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastLogin: new Date(),
            },
        });
        (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, user.id);
        res.status(201).json({
            success: true,
            message: "logged in successfully",
            user,
        });
    }
    catch {
        res.status(400).json({ message: "error in login", success: false });
    }
};
exports.login = login;
const logout = async (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "logged out successfully", success: true });
};
exports.logout = logout;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        }
        // Generete reset token
        const resetToken = crypto_1.default.randomBytes(20).toString("hex");
        const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
        await prisma_1.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpireAt: new Date(resetTokenExpireAt),
            },
        });
        //send email
        await (0, emails_1.sendPasswordResetEmail)(user.email, `${process.env.CLIENT_URL}/reser/password/${resetToken}`);
        res.status(201).json({
            success: true,
            message: "forgot password in  successfully",
            user,
        });
    }
    catch {
        res
            .status(400)
            .json({ message: "error in forgot password", success: false });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const { password } = req.body;
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpireAt: { gt: new Date() },
            },
        });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid or expired reset token" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await prisma_1.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpireAt: null,
            },
        });
        await (0, emails_1.sendResetSuccessEmail)(user.email);
        res.status(201).json({
            success: true,
            message: "Password reset successful",
            user,
        });
    }
    catch (erorr) {
        res
            .status(400)
            .json({ message: "error in reset password", success: false });
    }
};
exports.resetPassword = resetPassword;
const checAuth = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        return res.status(200).json({
            success: true,
            userId: req.userId,
        });
    }
    catch (error) {
        console.log("Error in checkAuth:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.checAuth = checAuth;
