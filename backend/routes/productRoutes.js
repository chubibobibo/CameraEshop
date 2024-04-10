import express from "express";
const router = express.Router();

//import controllers
import {
  allProducts,
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

router.post("/", addProductValidation, addProduct);
router.patch("/:id", productIdValidation, addProductValidation, updateProduct);
router.get("/", allProducts);
router.get("/:id", productIdValidation, specificProduct);
router.delete("/:id", productIdValidation, deleteProduct);

export default router;
