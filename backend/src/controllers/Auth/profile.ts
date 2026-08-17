import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateUsername = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    const usernameTaken = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameTaken && usernameTaken.id !== req.userId) {
      return res.status(400).json({ success: false, message: "Username is already taken" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: { username },
      omit: { password: true },
    });

    res.status(200).json({
      success: true,
      message: "Username updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update username" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Both passwords are required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: req.userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to change password" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await prisma.user.delete({
      where: { id: req.userId },
    });

    res.clearCookie("authToken");
    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete account" });
  }
};