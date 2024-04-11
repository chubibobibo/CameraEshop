import mongoose from "mongoose";
import { ProductModel } from "./ProductSchema.js";

const { Schema } = mongoose;

const CartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: ProductModel,
  },
});

export const CartModel = mongoose.model("CartModel", CartSchema);
