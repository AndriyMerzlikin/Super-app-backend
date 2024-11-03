import { Router } from "express";
import {
	getAllHeroes,
	getHeroById,
	createHero,
	updateHero,
	patchHero,
	deleteHero
} from "../controllers/heroController.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.get("/", getAllHeroes);

router.get("/:id", getHeroById);

router.post("/", upload.single("images"), createHero);

router.put("/:id", upload.array("images", 10), updateHero);

router.patch("/:id", patchHero);

router.delete("/:id", deleteHero);

export default router;
