import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export const getAchievements = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const wordsCount = await prisma.word.count({ where: { userId } });
    const gamesCount = await prisma.gameResult.count({ where: { userId } });

    const allResults = await prisma.gameResult.findMany({
      where: { userId },
      select: { score: true, totalQuestions: true },
    });

    const hasPerfectScore = allResults.some((r) => r.score === r.totalQuestions);

    const achievements: Achievement[] = [
      {
        id: "first-word",
        title: "Перший крок",
        description: "Додай перше слово у словник",
        unlocked: wordsCount >= 1,
      },
      {
        id: "ten-words",
        title: "Поповнення словника",
        description: "Додай 10 слів у словник",
        unlocked: wordsCount >= 10,
      },
      {
        id: "twenty-five-words",
        title: "Мовний скарб",
        description: "Додай 25 слів у словник",
        unlocked: wordsCount >= 25,
      },
      {
        id: "first-game",
        title: "Перша гра",
        description: "Зіграй свою першу гру",
        unlocked: gamesCount >= 1,
      },
      {
        id: "five-games",
        title: "Досвідчений гравець",
        description: "Зіграй 5 ігор",
        unlocked: gamesCount >= 5,
      },
      {
        id: "perfect-score",
        title: "Відмінник",
        description: "Набери 100% результат хоча б раз",
        unlocked: hasPerfectScore,
      },
    ];

    return res.status(200).json(achievements);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};