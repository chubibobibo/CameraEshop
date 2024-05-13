import jwt from "jsonwebtoken";
import { ExpressError } from "../error/ExpressError.js";

export const userAuth = async (req, res, next) => {
  //authenticating if user is logged in
  const { userCookie } = req.cookies;
  if (!userCookie) {
    throw new ExpressError("User is not logged in");
  }
  try {
    //obtain logged user data
    req.user = jwt.verify(userCookie, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
  }
  next();
};

//isAdmin
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    // const adminUser = roles.includes(req.user.role);
    // if (!adminUser) {
    //   throw new ExpressError("not an admin");
    // }
    if (!roles.includes(req.user.userRole)) {
      throw new ExpressError("User is not an admin", 400);
    }
    next();
  };
};

export const isTestUser = (req, res, next) => {
  if (req.user.userId === "661274424fda4ac1fd6a0fe7") {
    throw new ExpressError("Login to add items to cart", 400);
  }
  next();
};
