const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../middleware/auth");

router.post("" ,auth, productController.createProduct);

router.put("/:id",auth , productController.updateProduct);

router.get("", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post("/filter", productController.getProductByType);

router.delete("/:id",auth , productController.deleteProduct);

router.post("/search", productController.searchProducts);

module.exports = router;