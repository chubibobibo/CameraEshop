import "express-async-errors";
import { ExpressError } from "../error/ExpressError.js";
import { CartModel } from "../models/CartSchema.js";
import { ProductModel } from "../models/ProductSchema.js";
import { UserModel } from "../models/UserSchema.js";

// export const addToCart = async (req, res) => {
//   const { id } = req.params;
//   const foundItem = await ProductModel.findById(id);
//   const cartItem = foundItem._id;
//   // console.log(foundItem);
//   if (!foundItem) {
//     throw new ExpressError("No product with that id", 400);
//   }
//   const cartProduct = await CartModel.create(cartItem);
//   console.log(cartProduct);
//   if (!cartProduct) {
//     throw new ExpressError("Cannot add item to cart", 400);
//   }
//   res
//     .status(200)
//     .json({ message: `${foundItem.prodName} added to cart`, cartProduct });
// };

//delete item from cart
export const deleteCart = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const foundUser = await UserModel.findById(req.user.userId);
  if (!foundUser) {
    throw new ExpressError("User is not logged in", 400);
  }

  const deletedItem = await UserModel.findByIdAndUpdate(
    req.user.userId,
    { $pull: { cart: { _id: id } } },
    { safe: true, multi: false }
  );
  res.status(200).json({ message: "item deleted" });
};
