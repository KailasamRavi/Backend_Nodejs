const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const vendorRoutes = require("./Routes/vendorRoutes");
const firmRoutes = require("./Routes/firmRoutes");
const productRoutes = require("./Routes/productRoutes");
const path = require("path");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyparser.json());

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server Started Succesfully ${PORT}`);
});

app.use("/vendor", vendorRoutes);

app.use("/firm", firmRoutes);

app.use("/product", productRoutes);

app.use("/", (req, res) => {
  res.send("<h1> Welcome to Our First Website");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGODB Connected Successfully"))
  .catch((error) => console.log("Error in Database", error));
