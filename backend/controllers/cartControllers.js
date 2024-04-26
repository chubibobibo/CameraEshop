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
//     throw new ExpressError("No product with Sthat id", 400);
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

//adding to cart
export const addToCart = async (req, res) => {
  //Id  to find the specific item
  const { id } = req.params;
  const foundItem = await ProductModel.findById(id);
  console.log(`this is the foundItem: ${foundItem}`);
  if (!foundItem) {
    throw new ExpressError("Item cannot be found");
  }
  if (!req.user) {
    throw new ExpressError("User is not logged in", 400);
  }
  //finding the logged user to access it's cart
  const foundUser = await UserModel.findById(req.user.userId);

  //updating the logged user's cart
  const newItem = await UserModel.findByIdAndUpdate(
    req.user.userId,
    {
      $push: { cart: { productId: id, productQty: 1 } },
    },
    { new: true }
  );

  // await foundUser.save(); //save the new instance of foundUser with new cart value
  res
    .status(200)
    .json({ message: `${foundItem.prodName} was added to cart`, newItem });
};

//delete item from cart
export const deleteCart = async (req, res) => {
  //id needed to find the specific item
  const { id } = req.params;
  console.log(id);
  //obtain logged user to acces it's cart items
  const foundUser = await UserModel.findById(req.user.userId);
  if (!foundUser) {
    throw new ExpressError("User is not logged in", 400);
  }
  //deleting the specific item in the cart by updating
  await UserModel.findByIdAndUpdate(
    req.user.userId,
    { $pull: { cart: { _id: id } } },
    { safe: true, multi: false }
  );
  res.status(200).json({ message: "item deleted" });
};
