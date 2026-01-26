import { Router } from "express";
import usuarioController from "../controllers/usuario.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/usuarios", usuarioController.findAll);
router.post("/usuario", usuarioController.create);
router.post("/usuario/login",usuarioController.login);
router.delete("/usuario/:id", authMiddleware, usuarioController.delete);


    
export default router;
