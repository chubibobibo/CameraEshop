import express from "express";
const router = express.Router();
//import controllers
import { deleteCart } from "../controllers/cartControllers.js";

//import auth
import { userAuth } from "../middleware/authentication.js";

router.delete("/:id", userAuth, deleteCart);

export default router;
