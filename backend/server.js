import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//json parser
app.use(express.json());

app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found!" });
});

app.use((err, req, res, next) => {
  const status = 404 || err.status;
  const message = "Something went wrong" || err.message;
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`LISTENING TO PORT ${process.env.PORT}`);
});
