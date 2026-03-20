import { Router } from "express";
import avatarController from "../controllers/avatar.controller.js";

const router = Router();

router.get("/avatar", avatarController.getAll);

export default router;