import { Request, Response } from "express";
import Short from "../models/Short.js";

// GET /shorts
export const getAllShorts = async (_req: Request, res: Response) => {
  try {
    const shorts = await Short.find();
    res.json(shorts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /shorts/:id
export const getShortById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const short = await Short.findById(id);
    if (short) {
      res.json(short);
    } else {
      res.status(404).json({ message: "Short not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
