import { body, param, validationResult } from "express-validator";
import { UserModel } from "../models/UserSchema.js";
import { ExpressError } from "../error/ExpressError.js";

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
    .isLength({ max: 30 }),
  body("lastName")
    .notEmpty()
    .withMessage("Last Name cannot be empty")
    .isLength({ max: 30 }),
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
