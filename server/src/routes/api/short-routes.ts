import express from "express";
import {
  getAllShorts,
  getShortById,
} from "../../controllers/short-controller.js";

const router = express.Router();

// GET /shorts - Get all shorts
router.get("/", getAllShorts);

// GET /shorts/:id - Get a short by id
router.get("/:id", getShortById);

export { router as shortRouter };
