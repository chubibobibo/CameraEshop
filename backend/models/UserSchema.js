import mongoose from "mongoose";
import { roles } from "../utils/rolesObject.js";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    //obtain values of roles object and add returns as array used as enum
    enum: Object.values(roles),
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductSchema",
    },
  ],
});

export const UserModel = mongoose.model("UserModel", UserSchema);
