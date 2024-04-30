import express from "express";
const router = express.Router();

//import contorllers
import { loggedUser, updateUser } from "../controllers/adminControllers.js";

//auth import
import { userAuth } from "../middleware/authentication.js";

//multer middleware saving to public folder
import upload from "../middleware/multerMiddleware.js";

//routes
router.get("/loggedUser", userAuth, loggedUser);
router.patch("/updateUser", upload.single("avatar"), userAuth, updateUser);

export default router;
