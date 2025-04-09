import express from "express";
import {
  getAllCharacters,
  getCharacterById,
} from "../../controllers/character-controller.js";

const router = express.Router();

// GET /tickets - Get all tickets
router.get("/", getAllCharacters);

// GET /tickets/:id - Get a ticket by id
router.get("/:id", getCharacterById);

export { router as characterRouter };
