import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import plantnetController from "../controllers/plantnet.controller.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Adicionando middleware do multer para receber a imagem via form-data (campo 'image')
router.post("/plantnet/identify", authMiddleware, upload.single('image'), plantnetController.identify);

export default router;
