const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


const homeController = require("./controllers/homecontroller");
const productController = require("./controllers/productController");
const UserController = require("./controllers/usercontroller")
const imgController = require("./controllers/imageUploadController")
const mongoose = require('mongoose');
const req = require("express/lib/request");
const checkAuth = require("./middleware/check-auth");
let abc = mongoose.connect('mongodb://127.0.0.1:27017/product_db',{useNewUrlParser:true}); 
const db = mongoose.connection;
db.once("open",()=> console.log("Successfully connected to the mongoDB using Mongoose!"));

const port =process.env.PORT||3000;
// const port =process.env.PORT||6000;
const app=express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/images", express.static(path.join("/images")));
app.get('/',(req,res)=>{
    res.send("Welcome to Herb Garden Database!");
});
app.get('/welcome', homeController.respondWithWelcome);

// Crud ..Create | working
app.post('/product', productController.createProduct);

// cRud ..Read | Working
// app.get('/product', productController.getAllProduct);
app.get('/product', productController.getAllProduct);
app.get('/api/product', productController.getAllProduct);
app.get('/api/products', productController.getAllProduct);


app.get('/api/users', productController.getAllUsers);


// crUd ..Update | 
app.put('/product/:productId', productController.updateProduct);
app.put('/api/product/:productId', productController.updateProduct);
app.put('/api/products/:productId', productController.updateProduct);


// cruD  ..Delete | Working
app.delete('/product/:productId', productController.deleteProduct);
app.delete('/api/product/:productId', productController.deleteProduct);
app.delete('/api/products/:productId', productController.deleteProduct);

//  product getByID | Working
// app.get('/product/:productId',checkAuth, productController.getProductById);
app.get('/product/:productId',checkAuth, productController.getProductById);
app.get('/api/product/:productId',checkAuth, productController.getProductById);
app.get('/api/products/:productId',checkAuth, productController.getProductById);

app.get('/api/users/:userId', productController.getUserById);

// get product with price with discount
app.get('/pro/total', productController.getAllProductWithDiscount);

// for partial update | Working
app.patch('/product/:productId', productController.partialUpdate);
app.patch('/api/product/:productId', productController.partialUpdate);
app.patch('/api/products/:productId', productController.partialUpdate);

app.patch('/api/changerole/:userId', UserController.changerole);

// app.patch('/api/changerole/abc', homeController.respondWithWelcome);

app.post('/api/upload', imgController.imgUpload);
// UserController url
app.post('/api/signup', UserController.signup);
app.post('/api/login', UserController.login);

app.listen(port,()=>{console.log(`Running on port ${port}`)});
// app.use('/employees', employeeController);





