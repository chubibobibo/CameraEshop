import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//route imports
import registerRoute from "./routes/userRoutes.js";

const app = express();

//json parser
app.use(express.json());

//user routes
app.use("/api/users/", registerRoute);

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
