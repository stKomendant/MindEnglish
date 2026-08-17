/// <reference path="./types/express.d.ts" />
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-server/auth";
import cookiParser from "cookie-parser";
import wordRouter from "./routes/word/word";
import gameResultRouter from "./routes/gameResult/gameResult";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookiParser());

app.use("/auth", authRoutes);
app.use("/api/words", wordRouter)
app.use("/api/game-results", gameResultRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
