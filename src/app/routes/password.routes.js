import { Router } from "express";

import passwordController from "../controllers/password.controller.js";
import { validateResetToken } from "../middlewares/passwordToken.middleware.js";

const router = Router();

router.post("/password/forgot", passwordController.forgot);
router.get("/password/validate", validateResetToken, passwordController.validate);
router.post("/password/reset", validateResetToken, passwordController.reset);

export default router;