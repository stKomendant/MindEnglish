/// <reference path="./types/express.d.ts" />
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-server/auth";
import cookiParser from "cookie-parser";
import wordRouter from "./routes/word/word";
import gameResultRouter from "./routes/gameResult/gameResult";
import achievementRouter from "./routes/achievement/achievement";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://mind-english.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookiParser());

app.use("/auth", authRoutes);
app.use("/api/words", wordRouter)
app.use("/api/game-results", gameResultRouter)
app.use("/api/achievements", achievementRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
