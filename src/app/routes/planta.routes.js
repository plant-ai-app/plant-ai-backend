import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import plantaController from "../controllers/planta.controller.js";

const router = Router();

router.post("/planta", authMiddleware, plantaController.create);

export default router