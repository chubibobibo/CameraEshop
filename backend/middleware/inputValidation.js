import { body, param, validationResult } from "express-validator";
import { UserModel } from "../models/UserSchema.js";
import { ExpressError } from "../error/ExpressError.js";

import mongoose from "mongoose";
//category object
import { categories } from "../utils/categoryObject.js";
import { ProductModel } from "../models/ProductSchema.js";

//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

//validation for  register inputs
export const registerValidation = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name should not be empty")
    .isLength({ max: 30 })
    .withMessage("Name cannot exceed 30 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last Name cannot be empty")
    .isLength({ max: 30 })
    .withMessage("Last name cannot exceed 30 characters"),
  body("email")
    .isEmail()
    .withMessage("Must be a valid Email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    //custom validator of the email from req.body
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError("Email already registered", 400);
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
]);

//validations for login inputs
export const loginValidation = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Should be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters"),
]);

export const addProductValidation = withValidationErrors([
  body("prodName")
    .notEmpty()
    .withMessage("Product name cannot be empty")
    .isLength({ max: 30 })
    .withMessage("Product name cannot exceed 30 characters"),
  body("prodQty")
    .notEmpty()
    .withMessage("Quantity cannot be empty")
    .isFloat({ min: 0 })
    .withMessage("Quantity cannot be negative"),
  body("prodDescription")
    .notEmpty()
    .withMessage("Product Description cannot be empty")
    .isLength({ max: 445 })
    .withMessage("Description cannot exceed 40 characters"),
  body("prodCategory")
    .notEmpty()
    .withMessage("Category cannot be empty")
    .isIn(Object.values(categories))
    .withMessage("Not a valid category"),
  body("price")
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isFloat({ min: 1 })
    .withMessage("Price should be a number not less than 1"),
]);

export const productIdValidation = withValidationErrors([
  param("id").custom(async (id) => {
    const validId = await mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new ExpressError("Not a valid id");
    }
    const foundProduct = await ProductModel.findById(id);
    if (!foundProduct) {
      throw new ExpressError("No product with that id found", 400);
    }
  }),
]);

//update product validation
export const updateProductValidation = withValidationErrors([
  body("prodName")
    .notEmpty()
    .withMessage("Product name cannot be empty")
    .isLength({ max: 30 })
    .withMessage("Product name cannot exceed 30 characters"),
  body("prodQty")
    .notEmpty()
    .withMessage("Quantity cannot be empty")
    .isFloat({ min: 0 })
    .withMessage("Quantity cannot be negative"),
  body("prodDescription")
    .notEmpty()
    .withMessage("Product Description cannot be empty")
    .isLength({ max: 445 })
    .withMessage("Description cannot exceed 40 characters"),
  body("prodCategory")
    .notEmpty()
    .withMessage("Category cannot be empty")
    .isIn(Object.values(categories))
    .withMessage("Not a valid category"),
  body("price")
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isFloat({ min: 1 })
    .withMessage("Price should be a number not less than 1"),
]);

//update user validation
export const updateUserValidation = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name should not be empty")
    .isLength({ max: 30 })
    .withMessage("Name cannot exceed 30 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last Name cannot be empty")
    .isLength({ max: 30 })
    .withMessage("Last name cannot exceed 30 characters"),
  body("email")
    .isEmail()
    .withMessage("Should be a valid email address")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .custom(async (email, { req }) => {
      //if email exist
      const foundUser = await UserModel.findOne({ email: email });
      if (foundUser && foundUser._id.toString() !== req.user.userId) {
        throw new ExpressError("User not authorized");
      }
    }),
]);
