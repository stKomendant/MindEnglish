"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const verifyToken = async (req, res, next) => {
    const authToken = req.cookies.authToken;
    if (!authToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - no token provided",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        if (!decoded) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized - inivalid token" });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }
        req.userId = user.id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};
exports.verifyToken = verifyToken;
