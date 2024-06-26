import "express-async-errors";
import { UserModel } from "../models/UserSchema.js";
import { ProductModel } from "../models/ProductSchema.js";
import { ExpressError } from "../error/ExpressError.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { ifError } from "assert";

//create a new product
export const addProduct = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data recieved", 400);
  }
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path); //uploading the path of the image parsed by multer
    await fs.unlink(req.file.path); //removes the image in the public folder.

    //access the req.body to insert the response of cloudinary
    req.body.avatarUrl = response.secure_url;
    req.body.avatarPublicId = response.public_id;
  }

  //find logged user and check if user has a avatar productId
  //delete and replace the image if image file and user has avatarPublicId.
  const user = await UserModel.findById(req.user.userId);
  if (req.file && user.avatarPublicId) {
    await cloudinary.uploader.destroy(user.avatarPublicId);
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
  const { search } = req.query;
  //object as default query
  const queryObj = {
    prodCategory: "Mirrorless",
  };

  if (search) {
    queryObj.$or = [
      {
        prodName: { $regex: search, $options: "i" },
      },
    ];
  }

  const foundMirrorless = await ProductModel.find(queryObj);
  if (foundMirrorless.length === 0) {
    throw new ExpressError("No mirrorless cameras found", 400);
  }
  res.status(200).json({ foundMirrorless });
};

//find dslr
export const findDslr = async (req, res) => {
  //obtaining query string
  // console.log(req.query);
  const { search } = req.query;
  //object to be used as default in find query
  const queryObj = {
    prodCategory: "Dslr",
  };

  //check whether a query string exist
  //creates a key value pair in our queryObj based off the result in comparing the query string received to the prodName in database.
  if (search) {
    queryObj.$or = [
      {
        //compare the query string from forms to the prodName in database
        prodName: { $regex: search, $options: "i" },
      },
    ];
  }
  const foundDslr = await ProductModel.find(queryObj); //use the object that will contain either the query from forms or the default query

  if (foundDslr.length === 0) {
    throw new ExpressError("No Dslr found", 400);
  }
  res.status(200).json({ foundDslr });
};

//find point and shoot
export const findPoint = async (req, res) => {
  //obtain data from req.query
  //create an object as default query to find the products in the database.
  const { search } = req.query;
  const queryObj = {
    prodCategory: "Point and Shoot",
  };

  //if query exists create a new property (prodName) that will have a value based on the search query which will be used in the .find() method in the database.
  if (search) {
    queryObj.$or = [
      {
        prodName: { $regex: search, $options: "i" },
      },
    ];
  }
  const foundPoint = await ProductModel.find(queryObj);

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
  //check for image file
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path); // delete from public folder.
    req.body.avatarUrl = response.secure_url;
    req.body.avatarPublicId = response.public_id;
  }

  //delete if avatarPublicId exists
  //delete images in cloudinary if image exist.
  const foundProduct = await ProductModel.findById(id);
  if (req.file && foundProduct.avatarPublicId) {
    await cloudinary.uploader.destroy(foundProduct.avatarPublicId);
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
