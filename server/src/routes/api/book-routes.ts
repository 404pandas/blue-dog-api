import express from "express";
import { getAllBooks, getBookById } from "../../controllers/book-controller.js";

const router = express.Router();

// GET /books - Get all books
router.get("/", getAllBooks);

// GET /books/:id - Get a book by id
router.get("/:id", getBookById);

export { router as bookRouter };
