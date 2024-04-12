import "express-async-errors";
import { UserModel } from "../models/UserSchema.js";
import { ExpressError } from "../error/ExpressError.js";

//obtain current logged user
export const loggedUser = async (req, res) => {
  if (!req.user) {
    throw new ExpressError("No user logged in");
  }
  const user = await UserModel.findById(req.user.userId);
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
