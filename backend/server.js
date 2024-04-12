import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

//route imports
import usersRoute from "./routes/userRoutes.js";
import productsRoute from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import adminRoute from "./routes/adminRoutes.js";

const app = express();

//json parser
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//user routes
app.use("/api/users/", usersRoute);
app.use("/api/products/", productsRoute);
app.use("/api/cart/", cartRoute);
app.use("/api/admin/", adminRoute);

// getting-started.js
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found!" });
});

app.use((err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`LISTENING TO PORT ${process.env.PORT}`);
});
