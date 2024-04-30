import "express-async-errors";
import { UserModel } from "../models/UserSchema.js";
import { ExpressError } from "../error/ExpressError.js";
//cloudinary
import cloudinary from "cloudinary";
import { promises as fs } from "fs"; //files system used in deleting the img in public folder

//obtain current logged user
export const loggedUser = async (req, res) => {
  if (!req.user) {
    throw new ExpressError("No user logged in");
  }
  //NOTE: used .populate() to pouplate the cart with the all the data of the products instead of just being an ObjectId.
  //Allows us to display all the details of the products in the cart by refering and querying the ProductModel using the ObjectId saved in the cart property of UserModel.
  const user = await UserModel.findById(req.user.userId).populate(
    "cart.productId"
  );
  res.status(200).json({ user });
};

//updating user profile
export const updateUser = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data recieved");
  }

  //obtain loggedUser(req.user) to delete the password first (destructuring)
  //password will not be modified this way
  const inputData = { ...req.body };
  delete inputData.password;

  //check if req.file (created by multer) exist then implement cloudinary API for uploading the file that multer parsed
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path); //uploading the path of the image parsed by multer
    await fs.unlink(req.file.path); //removes the image in the public folder

    //set the properties in the UserSchema with the values from the response opf cloudinary
    inputData.avatarUrl = response.secure_url;
    inputData.avatarPublicId = response.public_id;
  }
  //Implement deleting of images from cloudinary if user uploads a different avatar
  const oldAvatar = await UserModel.findById(req.user.userId);
  console.log(oldAvatar);
  if (req.file && oldAvatar.avatarPublicId) {
    //if avatarPublicId exist in the user it will destroy it before saving the new response recieved from cloudinary
    await cloudinary.v2.uploader.destroy(oldAvatar.avatarPublicId);
  }

  const foundUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    inputData,
    { new: true }
  );

  if (!foundUser) {
    throw new ExpressError("User cannot be updated");
  }
  res.status(201).json({ message: "User updated", foundUser });
};
