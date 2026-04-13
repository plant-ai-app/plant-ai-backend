import { Router } from "express";
import cuidadoTipoController from "../controllers/cuidadoTipo.controller.js";

const router = Router();

router.get("/cuidados/tipos", cuidadoTipoController.findAll);

export default router;
