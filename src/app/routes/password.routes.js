import { Router } from "express";

import passwordController from "../controllers/password.controller.js";

const router = Router();

router.post("/password/forgot", passwordController.forgot);
router.post("/password/reset", passwordController.reset);

export default router;