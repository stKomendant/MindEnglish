import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createGameResult = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { score, totalQuestions, gameType } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (score === undefined || totalQuestions === undefined) {
      return res.status(400).json({ message: "score and totalQuestions are required" });
    }

    const result = await prisma.gameResult.create({
      data: {
        score,
        totalQuestions,
        gameType: gameType || "word-repeat",
        userId,
      },
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getGameResults = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const results = await prisma.gameResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};