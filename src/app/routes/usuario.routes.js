import { Router } from "express";
import usuarioController from "../controllers/usuario.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/usuarios", usuarioController.findAll);
router.get("/usuario/me", authMiddleware, usuarioController.findById);
router.post("/usuario", usuarioController.create);
router.post("/usuario/login",usuarioController.login);
router.patch("/usuario/senha", authMiddleware, usuarioController.updateSenha);
router.delete("/usuario", authMiddleware, usuarioController.delete);
router.patch("/usuario", authMiddleware, usuarioController.update);

    
export default router;
