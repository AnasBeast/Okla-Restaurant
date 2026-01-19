const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../middleware/auth");
const { validateIdParam } = require("../middleware/security");

router.post("", auth, productController.createProduct);

router.put("/:id", auth, validateIdParam, productController.updateProduct);

router.get("", productController.getProducts);

router.get("/:id", validateIdParam, productController.getProductById);

router.post("/filter", productController.getProductByType);

router.delete("/:id", auth, validateIdParam, productController.deleteProduct);

router.post("/search", productController.searchProducts);

module.exports = router;
