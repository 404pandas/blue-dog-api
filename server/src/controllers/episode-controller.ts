import { Request, Response } from "express";
import Episode from "../models/Episode.js";

// GET /episodes
export const getAllEpisodes = async (_req: Request, res: Response) => {
  try {
    const episodes = await Episode.find();
    res.json(episodes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /episodes/:id
export const getEpisodeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findById(id);
    if (episode) {
      res.json(episode);
    } else {
      res.status(404).json({ message: "Episode not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
