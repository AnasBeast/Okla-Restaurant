const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title : {type:String, required:true},
    type : {type:String, required:true},
    description : {type:String, required:true},
    bannerImg : {type:String, required:true},
    promo : {type:Boolean},
})

module.exports = mongoose.model("Product", productSchema)