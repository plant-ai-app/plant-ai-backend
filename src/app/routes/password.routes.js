import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

import passwordController from "../controllers/password.controller.js";

const router = Router();

router.post("/password/forgot", passwordController.forgotPassword);