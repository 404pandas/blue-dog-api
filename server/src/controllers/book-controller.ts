import { Request, Response } from "express";
import Character from "../models/Character.js";

// GET /characters
export const getAllCharacters = async (_req: Request, res: Response) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /characters/:id
export const getCharacterById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const character = await Character.findById(id);
    if (character) {
      res.json(character);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
