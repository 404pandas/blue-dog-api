import express from "express";
import {
  getAllEpisodes,
  getEpisodeById,
} from "../../controllers/episode-controller.js";

const router = express.Router();

// GET /episodes - Get all episodes
router.get("/", getAllEpisodes);

// GET /episodes/:id - Get a episode by id
router.get("/:id", getEpisodeById);

export { router as episodeRouter };
