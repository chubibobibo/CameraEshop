import "express-async-errors";
import { ProductModel } from "../models/ProductSchema.js";
import { ExpressError } from "../error/ExpressError.js";
import { UserModel } from "../models/UserSchema.js";

//create a new product
export const addProduct = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data recieved", 400);
  }
  const newProduct = await ProductModel.create(req.body);
  if (!newProduct) {
    throw new ExpressError("Cannot create a new product");
  }
  res.status(200).json({ message: "New product created", newProduct });
};

//find all products
export const allProducts = async (req, res) => {
  const foundProducts = await ProductModel.find({}); //find all
  if (foundProducts.length === 0) {
    throw new ExpressError("No products found", 400);
  }
  res.status(200).json({ message: "Products found", foundProducts });
};

//find mirrorless
export const findMirrorless = async (req, res) => {
  const foundMirrorless = await ProductModel.find({
    prodCategory: "Mirrorless",
  });
  if (foundMirrorless.length === 0) {
    throw new ExpressError("No mirrorless cameras found", 400);
  }
  res.status(200).json({ foundMirrorless });
};

//find dslr
export const findDslr = async (req, res) => {
  const foundDslr = await ProductModel.find({ prodCategory: "Dslr" });
  if (foundDslr.length === 0) {
    throw new ExpressError("No Dslr found", 400);
  }
  res.status(200).json({ foundDslr });
};

//find point and shoot
export const findPoint = async (req, res) => {
  const foundPoint = await ProductModel.find({
    prodCategory: "Point and Shoot",
  });
  if (foundPoint.length === 0) {
    throw new ExpressError("No point and shoot found", 400);
  }
  res.status(200).json({ foundPoint });
};

//find a specific product
export const specificProduct = async (req, res) => {
  const { id } = req.params;
  if (!req.params) {
    throw new ExpressError("No product id specified", 400);
  }
  const foundProduct = await ProductModel.findById(id);
  if (!foundProduct) {
    throw new ExpressError("No product found", 400);
  }
  res.status(200).json({ message: "product found", foundProduct });
};

//updating a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    throw new ExpressError("No data recieved", 400);
  }
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedProduct) {
    throw new ExpressError("Product cannot be updated");
  }
  res.status(200).json({ message: "Product updated", updatedProduct });
};

//delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await ProductModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted" });
};

//adding to cart
export const addToCart = async (req, res) => {
  const { id } = req.params;
  const foundItem = await ProductModel.findById(id);
  if (!foundItem) {
    throw new ExpressError("Item cannot be found");
  }
  if (!req.user) {
    throw new ExpressError("User is not logged in", 400);
  }
  const foundUser = await UserModel.findById(req.user.userId);
  foundUser.cart.push(foundItem._id);
  // console.log(foundUser);
  await foundUser.save(); //save the new instance of foundUser with new cart value
  res.status(200).json({ message: `${foundItem.prodName} was added to cart` });
};
