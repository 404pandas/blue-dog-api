import { Router } from "express";
import { characterRouter } from "./character-routes.js";
import { shortRouter } from "./short-routes.js";
import { bookRouter } from "./book-routes.js";
import { episodeRouter } from "./episode-routes.js";
import { itemRouter } from "./item-routes.js";
import { locationRouter } from "./location-routes.js";

const router = Router();

// Tested and working 8:54AM 4/10
router.use("/characters", characterRouter);
// Tested and Working 8:55AM 4/10
router.use("/shorts", shortRouter);
// Tested and working 8:56AM 4/10
router.use("/books", bookRouter);
// Tested and working 8:53AM 4/10
router.use("/episodes", episodeRouter);
// Tested and working 8:52AM 4/10
router.use("/items", itemRouter);
// Tested and working 8:55AM 4/10
router.use("/locations", locationRouter);

export default router;
