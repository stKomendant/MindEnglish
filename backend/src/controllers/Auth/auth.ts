import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookie";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      return res.status(400).json({ message: "user already exists" });
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
  }  catch (error) {
  console.error("Signup error:", error);
  res.status(400).json({ 
    message: "Signup failed", 
    error: error instanceof Error ? error.message : String(error) 
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
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
      where: { id: user.id },
      data: { lastLogin: new Date() },
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
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  });
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
      where: { id: req.userId },
      omit: { password: true },
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