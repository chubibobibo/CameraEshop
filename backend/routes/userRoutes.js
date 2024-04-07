import express from "express";
const router = express.Router();

//controller imports
import { register, login } from "../controllers/userControllers.js";

//input validations
import { registerValidation } from "../middleware/inputValidation.js";

router.post("/register", registerValidation, register);
router.post("/login", login);

export default router;
