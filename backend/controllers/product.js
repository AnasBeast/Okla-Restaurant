const Product = require("../models/product");

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

exports.createProduct = async(req , res , next)=>{
    const product = new Product({
        title : req.body.title,
        type : req.body.type,
        description : req.body.description,
        bannerImg : req.body.bannerImg,
        promo : req.body.promo,
    });
    await product
        .save()
        .then((result)=>{
            res.status(201).json({
                message:"Product added sucessfully",
                product: {
                    ...result._doc,
                    id: result._id,
                },
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Fail to create Product!",
                error : err,
            })
        })
}

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

exports.updateProduct = async(req , res , next)=>{

    await Product.updateOne({_id: req.params.id}, req.body)
        .then((result)=>{
            res.status(200).json({message:"Update is successful!"});
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Couldn't update product!",
                error : err,
            })
        })
}

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