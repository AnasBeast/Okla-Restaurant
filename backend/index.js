const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const blogRoutes = require("./routes/blog");

const dotenv = require('dotenv');

dotenv.config();
main()
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))

async function main(){
    await mongoose.connect(process.env.MONGO_DB)
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Auth-Token,x-access-token");
    next();
});
app.use("/api/product", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(process.env.PORT || 8080, ()=>{
    console.log("listening on port 8080")
})