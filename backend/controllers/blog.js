const Blog = require("../models/blog");

exports.getBlogs = async(req,res,next) =>{
    const pageSize = +req.query.pagesize;
    const currPage = +req.query.page;
    const blogQuery = Blog.find();
    let fetchBlog;
    if (pageSize && currPage){
        blogQuery.skip(pageSize * (currPage -1 )).limit(pageSize);
    }
    await blogQuery
        .then((doc)=>{
            fetchBlog = doc;
            return Blog.countDocuments();
        })
        .then((count)=>{
            res.status(200).json({
                message: "All Blogs fetched 200!",
                blogs: fetchBlog,
                maxBlogs: count,
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Fetching Blogs failed!"
            });
        });
};

exports.createBlog = async(req , res , next)=>{
    const blog = new Blog({
        image : req.body.image,
    });
    await blog
        .save()
        .then((result)=>{
            res.status(201).json({
                message:"Blog added sucessfully",
                blog: {
                    ...result._doc,
                    id: result._id,
                },
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Fail to create Blog!",
                error : err,
            })
        })
}

exports.getBlogById = async(req, res , next)=>{
    await Blog.findById(req.params.id)
        .then((blog)=>{
            if(blog){
                res.status(200).json(blog);
            }
            else{
                res.status(404).json({message: "Blog not Found!"})
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Fetching blog failed",
            });
        });
}

exports.updateBlog = async(req , res , next)=>{

    await Blog.updateOne({_id: req.params.id}, req.body)
        .then((result)=>{
            res.status(200).json({message:"Update is successful!"});
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Couldn't update blog!",
                error : err,
            })
        })
}

exports.deleteBlog = async(req, res, next) =>{
    await Blog.deleteOne({ _id: req.params.id })
    .then((resp) =>{
       res.status (200).json({ message: "Delete is successful!" });
    })
    .catch((error) =>{
        res.status (500).json({
            message: "Couldn't delete blog!",
            err: error
        });
    });
};

exports.searchBlogs = async(req,res,next) =>{
    const query = req.query.query
    await Blog.find({
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
                 message: "Couldn't found any blog!",
                 err: error
             });
         });
        
};