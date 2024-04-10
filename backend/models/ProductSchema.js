import mongoose from "mongoose";
import { categories } from "../utils/categoryObject.js";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  prodName: {
    type: String,
    required: true,
  },
  prodQty: {
    type: Number,
    required: true,
  },
  prodCategory: {
    type: String,
    enum: Object.values(categories),
    required: true,
  },
});

export const ProductModel = mongoose.model("ProductModel", ProductSchema);
