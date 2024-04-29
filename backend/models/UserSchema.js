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
      productId: {
        type: Schema.Types.ObjectId,
        ref: "ProductModel", //should be the model and not the schema
      },
      productQty: {
        type: Number,
        required: true,
      },
    },
  ],
  //avatar for updating the user profile
  avatarUrl: {
    type: String,
  },
  avatarPublicId: {
    type: String,
  },
});

export const UserModel = mongoose.model("UserModel", UserSchema);
