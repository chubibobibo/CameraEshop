import express from "express";
const router = express.Router();

//import controllers
import {
  allProducts,
  findMirrorless,
  findDslr,
  findPoint,
  addProduct,
  specificProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

//validation imports
import {
  addProductValidation,
  productIdValidation,
} from "../middleware/inputValidation.js";

//import multer middleware
import upload from "../middleware/multerMiddleware.js";

//auth
import { userAuth } from "../middleware/authentication.js";

router.get("/", allProducts);
router.get("/category/mirrorless", findMirrorless);
router.get("/category/dslr", findDslr);
router.get("/category/point", findPoint);
router.post("/", upload.single("avatar"), addProductValidation, addProduct);
router.patch("/:id", productIdValidation, addProductValidation, updateProduct);

router.get("/:id", productIdValidation, specificProduct);
router.delete("/:id", productIdValidation, deleteProduct);

export default router;
