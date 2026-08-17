import crypto from "crypto";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
// import { sendResetSuccessEmail } from "../../mailtrap/emails";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpireAt: new Date(resetTokenExpireAt),
      },
    });

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
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpireAt: null,
      },
    });

    // await sendResetSuccessEmail(user.email);

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