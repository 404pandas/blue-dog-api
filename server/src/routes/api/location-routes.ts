import express from "express";
import {
  getAllLocations,
  getLocationById,
} from "../../controllers/location-controller.js";

const router = express.Router();

// GET /locations - Get all locations
router.get("/", getAllLocations);

// GET /locations/:id - Get a location by id
router.get("/:id", getLocationById);

export { router as locationRouter };
