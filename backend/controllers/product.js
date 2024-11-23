const multer = require("multer");
const Product = require("../models/product");
const { uploadImage } = require("./bucket");
// Configure Multer for file upload
const storage = multer.memoryStorage(); // Use memory storage to keep the file in buffer
const upload = multer({ storage });

exports.getProducts = async(req,res,next) =>{
    const pageSize = +req.query.pagesize;
    const currPage = +req.query.page;
    const productQuery = Product.find();
    let fetchProduct;
    if (pageSize && currPage){
        productQuery.skip(pageSize * (currPage -1 )).limit(pageSize);
    }
    await productQuery
        .then((doc)=>{
            fetchProduct = doc;
            return Product.countDocuments();
        })
        .then((count)=>{
            res.status(200).json({
                message: "All Products fetched 200!",
                products: fetchProduct,
                maxProducts: count,
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Fetching Products failed!"
            });
        });
};

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
        console.log(uploadedImagePath)
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
  

exports.getProductById = async(req, res , next)=>{
    await Product.findById(req.params.id)
        .then((product)=>{
            if(product){
                res.status(200).json(product);
            }
            else{
                res.status(404).json({message: "Product not Found!"})
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Fetching product failed",
            });
        });
}

exports.getProductByType = async(req, res , next)=>{
    await Product.find({type:req.query.type})
        .then((product)=>{
            if(product){
                res.status(200).json(product);
            }
            else{
                res.status(404).json({message: "Product not Found!"})
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Fetching product failed",
            });
        });
}

exports.updateProduct = [
    upload.single("bannerImg"), // Middleware to handle file upload 
    async(req , res , next)=>{
        const bannerImg = req.file;
        let uploadedImagePath = null;
        console.log(req.file)
        if (bannerImg) {
            // Call uploadImage or handle file storage logic
            uploadedImagePath = await uploadImage(bannerImg); 
            console.log(uploadedImagePath)
        }
       

        const product = {
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
            bannerImg: req.body.bannerImg || uploadedImagePath , // Store the path from uploadImage
            promo: req.body.promo, // Convert string to boolean
        };
        console.log(product)
        await Product.updateOne({_id: req.params.id}, product)
        .then((result)=>{
            res.status(200).json({message:"Update is successful!"});
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Couldn't update product!",
                error : err,
            })
        })
}]

exports.deleteProduct = async(req, res, next) =>{
    await Product.deleteOne({ _id: req.params.id })
    .then((resp) =>{
       res.status (200).json({ message: "Delete is successful!" });
    })
    .catch((error) =>{
        res.status (500).json({
            message: "Couldn't delete product!",
            err: error
        });
    });
};

exports.searchProducts = async(req,res,next) =>{
    const query = req.query.query
    await Product.find({
        $or: [
            {
              nom: {
                $regex: ".*" + query + ".*",
                $options: "i",
              },
            },
            {
              prenom: {
                $regex: ".*" + query + ".*",
                $options: "i",
              },
            },
            {
                pays: {
                  $regex: ".*" + query + ".*",
                  $options: "i",
                },
            },
            {
                number: {
                  $regex: ".*" + query + ".*",
                  $options: "i",
                },
            },
            {
                email: {
                  $regex: ".*" + query + ".*",
                  $options: "i",
                },
            }
          ],
        })
        .then((resp) =>{
            res.status (200).json({ 
                data : resp

            });
         })
         .catch((error) =>{
             res.status (500).json({
                 message: "Couldn't found any product!",
                 err: error
             });
         });
        
};