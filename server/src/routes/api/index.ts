import { Router } from "express";
import { characterRouter } from "./character-routes.js";
import { shortRouter } from "./short-routes.js";
import { bookRouter } from "./book-routes.js";
import { episodeRouter } from "./episode-routes.js";
import { itemRouter } from "./item-routes.js";
import { locationRouter } from "./location-routes.js";

const router = Router();

router.use("/characters", characterRouter);
router.use("/shorts", shortRouter);
router.use("/books", bookRouter);
router.use("/episodes", episodeRouter);
router.use("/items", itemRouter);
router.use("/locations", locationRouter);

export default router;
