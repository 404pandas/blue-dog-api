import { Router } from "express";
import { characterRouter } from "./character-routes.js";

const router = Router();

router.use("/characters", characterRouter);

export default router;
