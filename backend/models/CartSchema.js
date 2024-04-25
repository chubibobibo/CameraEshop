import mongoose from "mongoose";
import { ProductModel } from "./ProductSchema.js";

const { Schema } = mongoose;

const CartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: ProductModel,
  },
  // cartProductQty: {
  //   type: Number,
  //   required: true,
  // },
});

export const CartModel = mongoose.model("CartModel", CartSchema);
