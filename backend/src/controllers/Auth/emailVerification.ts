import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
// import { sendWelcomeEmail } from "../../mailtrap/emails";

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
      where: { id: user.id },
      data: {
        verificationToken: null,
        verificationTokenExpiresAt: null,
        isVerified: true,
      },
    });

    // await sendWelcomeEmail(user.email, user.username);

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