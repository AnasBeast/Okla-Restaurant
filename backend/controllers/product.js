const multer = require("multer");
const Product = require("../models/product");
const { uploadImage } = require("./bucket");
const { asyncHandler } = require("../middleware/errorHandler");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  PAGINATION,
  PRODUCT_TYPES,
} = require("../config/constants");

// Configure Multer for file upload with validation
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
        ),
        false,
      );
    }
  },
});

exports.getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = parseInt(req.query.pagesize) || PAGINATION.DEFAULT_PAGE_SIZE;
  const currentPage = parseInt(req.query.page) || PAGINATION.DEFAULT_PAGE;
  const type = req.query.type;

  // Build query
  let query = {};
  if (type && PRODUCT_TYPES.includes(type.toLowerCase())) {
    query.type = type.toLowerCase();
  }

  // Get products with pagination
  const products = await Product.find(query)
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize)
    .sort({ createdAt: -1 });

  // Get total count
  const totalProducts = await Product.countDocuments(query);

  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    products,
    maxProducts: totalProducts,
    pagination: {
      currentPage,
      pageSize,
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
    },
  });
});

exports.createProduct = [
  upload.single("bannerImg"), // Middleware to handle file upload
  async (req, res, next) => {
    try {
      console.log(req.body); // Ensure the body is logged correctly
      const bannerImg = req.file;

      if (!bannerImg) {
        return res.status(400).json({ message: "Banner image is required." });
      }

      // Call uploadImage or handle file storage logic
      const uploadedImagePath = await uploadImage(bannerImg);
      console.log(uploadedImagePath);
      const product = new Product({
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        bannerImg: uploadedImagePath, // Store the path from uploadImage
        promo: req.body.promo, // Convert string to boolean
      });

      const result = await product.save();

      res.status(201).json({
        message: "Product added successfully",
        product: {
          ...result._doc,
          id: result._id,
        },
      });
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({
        message: "Failed to create product!",
        error: err.message,
      });
    }
  },
];

exports.getProductById = async (req, res, next) => {
  await Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not Found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching product failed",
      });
    });
};

exports.getProductByType = async (req, res, next) => {
  await Product.find({ type: req.query.type })
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not Found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching product failed",
      });
    });
};

exports.updateProduct = [
  upload.single("bannerImg"), // Middleware to handle file upload
  async (req, res, next) => {
    const bannerImg = req.file;
    let uploadedImagePath = null;
    console.log(req.file);
    if (bannerImg) {
      // Call uploadImage or handle file storage logic
      uploadedImagePath = await uploadImage(bannerImg);
      console.log(uploadedImagePath);
    }

    const product = {
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      bannerImg: req.body.bannerImg || uploadedImagePath, // Store the path from uploadImage
      promo: req.body.promo, // Convert string to boolean
    };
    console.log(product);
    await Product.updateOne({ _id: req.params.id }, product)
      .then((result) => {
        res.status(200).json({ message: "Update is successful!" });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Couldn't update product!",
          error: err,
        });
      });
  },
];

exports.deleteProduct = async (req, res, next) => {
  await Product.deleteOne({ _id: req.params.id })
    .then((resp) => {
      res.status(200).json({ message: "Delete is successful!" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't delete product!",
        err: error,
      });
    });
};

exports.searchProducts = asyncHandler(async (req, res, next) => {
  const query = req.query.query || req.body.query;

  if (!query || query.trim().length < 2) {
    return res.status(400).json({
      status: "fail",
      message: "Search query must be at least 2 characters",
    });
  }

  const searchRegex = new RegExp(query.trim(), "i");

  const products = await Product.find({
    $or: [
      { title: searchRegex },
      { description: searchRegex },
      { type: searchRegex },
    ],
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: products,
    count: products.length,
  });
});

// Get products grouped by type
exports.getProductsGrouped = asyncHandler(async (req, res, next) => {
  const products = await Product.find().sort({ type: 1, createdAt: -1 });

  // Group products by type
  const grouped = products.reduce((acc, product) => {
    const type = product.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(product);
    return acc;
  }, {});

  res.status(200).json({
    status: "success",
    data: grouped,
    types: Object.keys(grouped),
  });
});
