import { Request, Response } from "express";
import Item from "../models/Item.js";

// GET /items
export const getAllItems = async (_req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /items/:id
export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
