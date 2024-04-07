//error handling
import "express-async-errors";
import { ExpressError } from "../error/ExpressError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//schema import
import { UserModel } from "../models/UserSchema.js";

//import roles object
import { roles } from "../utils/rolesObject.js";

//registering user
export const register = async (req, res) => {
  //data coming from req.body
  if (!req.body) {
    throw new ExpressError("No data recieved", 400);
  }
  //create an admin user
  //needs to use await
  const isAdmin = (await UserModel.countDocuments()) === 0;
  console.log(isAdmin);
  req.body.role = isAdmin ? "admin" : "user";

  //hashing password
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hashedPassword;

  const registeredUser = await UserModel.create(req.body);
  if (!registeredUser) {
    throw new ExpressError("Cannot register user", 400);
  }
  res.status(200).json({ message: "User Registered", registeredUser });
};

//Logging user
export const login = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data recieved");
  }
  const foundUser = await UserModel.findOne({ email: req.body.email });
  //   console.log(foundUser);
  if (!foundUser) {
    throw new ExpressError("No user found", 400);
  }
  const loggedUser = bcrypt.compareSync(req.body.password, foundUser.password);
  if (!loggedUser) {
    throw new ExpressError("Username or Password are incorrect");
  }

  //creating tokens and cookies
  //tokens accepts 3 parameters
  const token = jwt.sign(
    {
      userId: foundUser._id,
      userRole: foundUser.role,
      userName: foundUser.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  //create cookies with data from tokens
  res.cookie("userCookie", token, {
    httpOnly: true,
    //ms*sec*min*hrs*days
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: `Welcome ${foundUser.name}` });
};

//Loggin out user
export const logout = async (req, res) => {
  //create a new cookie that expires immediately
  //NOTE: logout should be in quotes
  res.cookie("userCookie", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "User logged out" });
};
