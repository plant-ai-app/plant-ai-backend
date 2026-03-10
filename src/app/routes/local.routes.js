import { Router } from "express";
import localController from "../controllers/local.controller.js";

const router = Router();

router.get("/locais", localController.findAll);


export default router;
