//error handling
import "express-async-errors";
import { ExpressError } from "../error/ExpressError.js";

//schema import
import { UserModel } from "../models/UserSchema.js";

//import roles object
import { roles } from "../utils/rolesObject.js";

export const register = async (req, res) => {
  //data coming from req.body
  if (!req.body) {
    throw new ExpressError("No data from the recieved", 400);
  }
  //create an admin user
  const isAdmin = UserModel.countDocuments() === 0;
  req.body.role = isAdmin ? "admin" : "user";

  const registeredUser = await UserModel.create(req.body);
  if (!registeredUser) {
    throw new ExpressError("Cannot register user", 400);
  }
  res.status(200).json({ message: "User Registered" });
};
