import { Router } from "express";
import usuarioController from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuarios", usuarioController.findAll);
    
export default router;
