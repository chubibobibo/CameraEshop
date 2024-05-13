import express from "express";
const router = express.Router();

//import controllers
import { addToCart, deleteCart } from "../controllers/cartControllers.js";

//import auth
import { userAuth, isTestUser } from "../middleware/authentication.js";

router.post("/:id", userAuth, isTestUser, addToCart);
router.delete("/:id", userAuth, isTestUser, deleteCart);

export default router;
