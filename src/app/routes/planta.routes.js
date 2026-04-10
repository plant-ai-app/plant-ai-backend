import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import plantaController from "../controllers/planta.controller.js";

const router = Router();

router.post(["/planta", "/plant"], authMiddleware, plantaController.create);
router.get("/plantas", plantaController.findAll);
router.get("/plantas/usuario", authMiddleware, plantaController.findByUserId);
router.get("/planta/:id", plantaController.findById);

export default router