import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { sendVerificationEmail } from "../mailtrap/emails";
import bcrypt from "bcrypt";

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

    // jwt
    generateTokenAndSetCookie(res, user.id);

    await sendVerificationEmail(user.email, verificationCode);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error something went wrong try again later" });
  }
};

export const login = async (req: Request, res: Response) => {
  res.send("login mane");
};
export const logout = async (req: Request, res: Response) => {
  res.send("logout mane");
};
