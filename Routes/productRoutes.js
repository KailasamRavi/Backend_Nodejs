const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

router.post("/add-product/:firmId", productController.addProduct);

router.get("/:firmId/products", productController.getProductByFirm);

router.delete("/:productId", productController.deleteProductById);

router.get("/uplods/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

module.exports = router;
