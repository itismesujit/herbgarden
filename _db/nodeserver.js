const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const homeController=require("./controllers/homecontroller");
const productController=require('./controllers/productController');
const userController=require('./controllers/usercontroller');
const { append } = require('express/lib/response');
const mongoose = require('mongoose');
const dbURL = "mongodb://127.0.0.1:27017/products_db";
mongoose.Promise=global.Promise;
const req = require("express/lib/request");
//Set up the connection the database
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true});
//assign the database to a variable 
const db = mongoose.connection;
db.once("open",()=> console.log("Successfully connected to the mongoDB using Mongoose!"));
module.exports=db;
const port =process.env.PORT||3000;
app.get('/',homeController.respondWithWelcome);
app.get(`/api/products`,productController.getAllProducts);
app.get('/api/products/:productId',productController.getProductById);
app.put('/api/products/:pId',productController.updateProductStatus);
app.patch('/api/products/:productId',productController.partialUpdate);
app.delete(`/api/products/:productId`,productController.deleteProduct);
app.post(`/api/products`,productController.createProduct);


//User Controller 
app.post( `/api/signup`,userController.signup);
app.post(`/api/login`,userController.login);
app.listen(port,()=>{console.log(`Running on port ${port}`)});