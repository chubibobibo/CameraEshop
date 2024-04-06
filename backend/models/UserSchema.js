import mongoose from "mongoose";

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
    required: true,
  },
  purchase: [
    {
      prodId: {
        type: Schema.Types.ObjectId,
        ref: "ProductSchema",
      },
    },
  ],
});

export const UserModel = mongoose.model("UserModel", UserSchema);
