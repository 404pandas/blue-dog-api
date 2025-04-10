import express from "express";
import { getAllItems, getItemById } from "../../controllers/item-controller.js";

const router = express.Router();

// GET /tickets - Get all tickets
router.get("/", getAllItems);

// GET /tickets/:id - Get a ticket by id
router.get("/:id", getItemById);

export { router as itemRouter };
