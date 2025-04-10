import express from "express";
import {
  getAllCharacters,
  getCharacterById,
} from "../../controllers/character-controller.js";

const router = express.Router();

// GET /characters - Get all characters
router.get("/", getAllCharacters);

// GET /characters/:id - Get a character by id
router.get("/:id", getCharacterById);

export { router as characterRouter };
