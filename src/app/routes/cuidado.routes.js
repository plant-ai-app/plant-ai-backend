import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import cuidadoController from "../controllers/cuidado.controller.js";

const router = Router();

router.get("/cuidado", cuidadoController.findAll);
router.post("/cuidado", authMiddleware, cuidadoController.create);
router.get("/cuidado/:id", authMiddleware, cuidadoController.findById);
router.get("/cuidado/planta/:plantaId", authMiddleware, cuidadoController.findByPlantaId);
router.patch("/cuidado/:id", authMiddleware, cuidadoController.update);
router.delete("/cuidado/:id", authMiddleware, cuidadoController.delete);

export default router;
