import { Router } from "express";
import cuidadoController from "../controllers/cuidado.controller.js";

const router = Router();

router.post("/cuidados", cuidadoController.create);
router.get("/cuidados", cuidadoController.findAll);
router.get("/cuidados/:id", cuidadoController.findById);
router.get("/cuidados/planta/:plantaId", cuidadoController.findByPlantaId);
router.put("/cuidados/:id", cuidadoController.update);
router.delete("/cuidados/:id", cuidadoController.delete);

export default router;
