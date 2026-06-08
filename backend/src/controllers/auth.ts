import { Request, Response } from "express";
import { registerUser } from "../services/auth";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const user = await registerUser(email, password, username);
    res.status(201).json(user);
  } catch {
    res.status(500).send("Failed to register");
  }
};
