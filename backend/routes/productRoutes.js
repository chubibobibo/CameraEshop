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
  addToCart,
} from "../controllers/productControllers.js";

//validation imports
import {
  addProductValidation,
  productIdValidation,
} from "../middleware/inputValidation.js";

//auth
import { userAuth } from "../middleware/authentication.js";

router.get("/", allProducts);
router.get("/category/mirrorless", findMirrorless);
router.get("/category/dslr", findDslr);
router.get("/category/point", findPoint);
router.post("/", addProductValidation, addProduct);
router.post("/:id", userAuth, addToCart);
router.patch("/:id", productIdValidation, addProductValidation, updateProduct);

router.get("/:id", productIdValidation, specificProduct);
router.delete("/:id", productIdValidation, deleteProduct);

export default router;
