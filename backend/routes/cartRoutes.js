import express from "express";
const router = express.Router();

//import controllers
import { addToCart } from "../controllers/cartControllers.js";

router.post("/:id", addToCart);

export default router;
