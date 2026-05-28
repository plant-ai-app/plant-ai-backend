import { Router } from "express";
import aiPlantController from "../controllers/aiPlant.controller.js";

const router = Router();

router.get("/ai-plant/:scientificName", aiPlantController.getDetails);

export default router;