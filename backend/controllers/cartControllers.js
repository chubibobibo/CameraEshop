import { ExpressError } from "../error/ExpressError.js";
import { CartModel } from "../models/CartSchema.js";
import { ProductModel } from "../models/ProductSchema.js";

export const addToCart = async (req, res) => {
  const { id } = req.params;
  const foundItem = await ProductModel.findById(id);
  const cartItem = foundItem._id;
  // console.log(foundItem);
  if (!foundItem) {
    throw new ExpressError("No product with that id", 400);
  }
  const cartProduct = await CartModel.create(cartItem);
  console.log(cartProduct);
  if (!cartProduct) {
    throw new ExpressError("Cannot add item to cart", 400);
  }
  res
    .status(200)
    .json({ message: `${foundItem.prodName} added to cart`, cartProduct });
};
