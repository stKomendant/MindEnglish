import crypto from "crypto";
import bcrypt from "bcrypt";

import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookie";
import {
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendVerificationEmail,
  sendResetSuccessEmail,
} from "../../mailtrap/emails";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,

        verificationToken: verificationCode,
        verificationTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    generateTokenAndSetCookie(res, user.id);

    // await sendVerificationEmail(user.email, verificationCode);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to send verification email" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    generateTokenAndSetCookie(res, user.id);

    res.status(201).json({
      success: true,
      message: "logged in successfully",
      user,
    });
  } catch {
    res.status(400).json({ message: "error in login", success: false });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "logged out successfully", success: true });
};

export const checAuth = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const verifyEmail = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const user = await prisma.user.findFirst({
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

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        verificationToken: null,
        verificationTokenExpiresAt: null,
        isVerified: true,
      },
    });

    await sendWelcomeEmail(user.email, user.username);

    res.status(201).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error something went wrong try again later",
      success: false,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpireAt: new Date(resetTokenExpireAt),
      },
    });

    //send email

    // await sendPasswordResetEmail(
    //   user.email,
    //   `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`,
    // );

    res.status(201).json({
      success: true,
      message: "forgot password in  successfully",
      user,
    });
  } catch {
    res
      .status(400)
      .json({ message: "error in forgot password", success: false });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params.token as string;
    const { password } = req.body;

    const user = await prisma.user.findFirst({
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

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpireAt: null,
      },
    });

    await sendResetSuccessEmail(user.email);

    res.status(201).json({
      success: true,
      message: "Password reset successful",
      user,
    });
  } catch (erorr) {
    res
      .status(400)
      .json({ message: "error in reset password", success: false });
  }
};
