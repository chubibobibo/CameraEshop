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
    next();
  } catch (err) {
    console.log(err);
  }
};
