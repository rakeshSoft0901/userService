import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "User created successfully" })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({
      message
    })
  }
}