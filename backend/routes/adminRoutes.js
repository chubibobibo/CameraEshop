import express from "express";
const router = express.Router();

//import contorllers
import { loggedUser, updateUser } from "../controllers/adminControllers.js";

//auth import
import { userAuth } from "../middleware/authentication.js";

//routes
router.get("/loggedUser", userAuth, loggedUser);
router.patch("/updateUser", userAuth, updateUser);

export default router;
