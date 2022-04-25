const express = require("express");
const cors = require("cors");
const app = express();
const path=require('path')
var corsOptions = {
  origin: "http://localhost:7000"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const checkAuth=require("./middleware/check-auth");
app.use("/images",express.static(path.join("/images")));


const homeController=require("./controllers/homecontroller");
const productController=require('./controllers/productController');
const usercontroller=require('./controllers/usercontroller')
const imageUploadController=require("./controllers/imageUploadController");

// const { append } = require('express/lib/response');
const mongoose = require('mongoose');
const dbURL = "mongodb://127.0.0.1:27017/product";
mongoose.Promise=global.Promise;
// const req = require("express/lib/request");

const port =process.env.PORT||3000;

//Set up the connection the database
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true});

//assign the database to a variable 
const db = mongoose.connection;
db.once("open",()=> console.log("Successfully connected to the mongoDB using Mongoose!"));
module.exports=db;


app.get('/',homeController.respondWithWelcome);
// app.get(`/api/products`,productController.getAllProducts);
 app.use('/api/products',productController);
 app.use("/api/",usercontroller);
app.use("/api/pictures",imageUploadController)

// app.get('/api/products/:productId',productController.getProductById);
// app.patch('/api/products/:productId',checkAuth,productController.partialUpdate);
// app.delete(`/api/products/:productId`,checkAuth,productController.deleteProduct);
// app.post(`/api/products`,checkAuth,productController.createProduct);

// //UserController url
// app.use(`/api/signup`,usercontroller);
// app.post(`/api/login`,usercontroller.login);
app.listen(port,()=>{console.log(`Running on port ${port}`)});