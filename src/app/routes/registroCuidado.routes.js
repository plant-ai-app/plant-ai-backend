import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import registroCuidadoController from "../controllers/registroCuidado.controller.js";

const router = Router();

router.get("/historico-cuidado", authMiddleware, registroCuidadoController.findAll);
router.post("/historico-cuidado", authMiddleware, registroCuidadoController.create);
router.get("/historico-cuidado/:id", authMiddleware, registroCuidadoController.findById);
router.get("/historico-cuidado/cuidado/:cuidadoId", authMiddleware, registroCuidadoController.findByCuidadoId);
router.patch("/historico-cuidado/:id", authMiddleware, registroCuidadoController.update);
router.delete("/historico-cuidado/:id", authMiddleware, registroCuidadoController.delete);

export default router;
