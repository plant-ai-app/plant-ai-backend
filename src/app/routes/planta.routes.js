import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import plantaController from "../controllers/planta.controller.js";

const router = Router();

router.post(["/planta", "/plants"], authMiddleware, plantaController.create);
router.get("/plants", plantaController.findAll);
router.get("/plants/user", authMiddleware, plantaController.findByUserId);
router.get("/plant/:id", plantaController.findById);
router.put("/plant/:id", authMiddleware, plantaController.update);
router.delete("/plant/:id", authMiddleware, plantaController.delete);

export default router