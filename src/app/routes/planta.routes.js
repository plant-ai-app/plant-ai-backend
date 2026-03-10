import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import plantaController from "../controllers/planta.controller.js";

const router = Router();

router.post("/planta", authMiddleware, plantaController.create);
router.get("/plantas", authMiddleware, plantaController.findAll);
router.get("/planta/:id", authMiddleware, plantaController.findById);
router.get("/plantas/usuario/:id", authMiddleware, plantaController.findByUserId);

export default router