const {
    json
} = require('body-parser');
const { Router } = require('express');
const Product = require('../productModel');
const Users = require('../userModel');



const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


// for product find  ..Read
exports.getAllUsers = (req, res) => {
    Users.find({}).exec().then((bookData) => {
            // console.log(JSON.stringify(bookData)) 
            res.send(bookData);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(404);
            res.send(error);
            // return [];
        })
        .then(() => console.log('promise complete. || getAllUsers'));
}



// for get user by id
exports.getUserById = (req, res) => {
    

    Users.findOne({ _id: req.params.userId}).exec().then((userData) => {
    // Users.findById({ _id: req.params.userId}).exec().then((userData) => {
    // Users.findById(req.params.userId).exec().then((userData) => {
            console.log(userData + '<== This I get.');
            res.send(userData);
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => console.log('promise complete |*| getUserByID'));
}

exports.getProductById = (req, res) => {
    Product.findById(req.params.productId).exec().then((bookData) => {
            res.send(bookData);
            console.log(bookData);
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => console.log('promise complete | getBookByID'));
}


// for product find  ..Read
exports.getAllProduct = (req, res) => {
    Product.find({}).exec().then((bookData) => {
            res.send(bookData);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(404);
            res.send(error);
            // return [];
        })
        .then(() => console.log('promise complete. | getAllBooks'));
}

// for product delete ..Delete
exports.deleteProduct = (req, res) => {
    let id = req.params.productId;
    Product.deleteOne({
            _id: id
        }).exec().then(data => {
            res.send(data)
        })
        .catch((error) => {
            console.log(error.message);
            express.status(204);
            res.send('Invalid ID/Id does not exists - information :' + error.message);
        })
        .then(() => console.log('Promise complete for delete'));
}

// for product update ..Update
exports.updateProduct = (req, res) => {
    let _id = req.params.productId;
    let productParams = req.body;
    delete productParams._id;
    console.log(productParams.tags, '<==before');
    productParams.tags = {} + productParams.tags
    console.log(productParams.tags, '<==== After');
    // delete productParams.tags;

    {
        {
            console.log(productParams, '<== productParmas')
        }
    }
    Product.findByIdAndUpdate(_id, {
            $set: productParams
        }).exec().then(data => {
            res.send(data)
        })
        .catch((error) => {
            console.log(error.message);
            express.status(204);
            res.send('Invalid ID/Id does not exists - information :' + error.message);
        })
        .then(() => console.log('Promise complete for update'));
}

// for book create ..Create
module.exports.createProduct = (req, res) => {
    let book = req.body;
    book.tags = JSON.stringify(req.body.tags);
    Product.create(book).then(data => {
            res.status(201);
            res.send(data)
        })
        .catch((error) => {
            console.log(error.message);
            res.status(204);
            res.send('Invalid Book title - Information : ' + error.message)
        })
        .then(() => console.log('promise completed for create'));
}



// for get Product by id
exports.getProductById = (req, res) => {
    Product.findById(req.params.productId).exec().then((bookData) => {
            res.send(bookData);
            console.log(bookData);
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => console.log('promise complete | getBookByID'));
}

// for update one of the properties ..Update
exports.partialUpdate = (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        }).exec().then(data => {
            res.send(data)
        })
        .catch((error) => {
            console.log(error.message);
            express.status(204);
            res.send('Invalid ID/Id does not exists - information :' + error.message);
        })
        .then(() => console.log('Promise complete for partial update'));
}

// for product find with total price ..Read
exports.getAllProductWithDiscount = (req, res) => {
    Product.find({}).exec().then((bookData) => {
            bookData.map((elem, index) => {
                return elem.price -= elem.discountAvailble;
            })
            res.send(bookData);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(404);
            res.send(error);
        })
        .then(() => console.log('promise complete. | getAllBooks'));
}