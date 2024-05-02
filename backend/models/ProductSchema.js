import mongoose from "mongoose";
import { categories } from "../utils/categoryObject.js";
const { Schema } = mongoose;

export const ProductSchema = new Schema({
  prodName: {
    type: String,
    required: true,
  },
  prodQty: {
    type: Number,
    required: true,
  },
  prodDescription: {
    type: String,
    required: true,
  },
  prodCategory: {
    type: String,
    enum: Object.values(categories),
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  avatarUrl: {
    type: String,
  },
  avatarPriductId: {
    type: String,
  },
});

export const ProductModel = mongoose.model("ProductModel", ProductSchema);
