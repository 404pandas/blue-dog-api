import { Request, Response } from "express";
import Location from "../models/Location.js";

// GET /locations
export const getAllLocations = async (_req: Request, res: Response) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /locations/:id
export const getLocationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
