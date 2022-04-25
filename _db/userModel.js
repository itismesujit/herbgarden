const mongoose = require("mongoose");
const {
    Schema
} = mongoose;
const userModel = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Users', userModel)






















// db.products.insertMany([
//     {

//         "_id": 1,
//         "productName": "Lavendar",
//         "productCode": "HERB-LMG",
//         "description": "Used in Perfumes and Soaps",
//         "price": 80.5,
//         "releaseDate": new Date(2021, 8, 7),
//         "imageUrl": "assets/images/lavendar.jpg",
//         "starRating": 1.3


//     },
//     {

//         "_id": 2,
//         "productName": "Lemon Grass",
//         "productCode": "HERB-LMG",
//         "description": "Used in Soaps and Thai cuisuines.Can be used for tea",
//         "price": 80.5,
//         "releaseDate": new Date(2021, 8, 7),
//         "imageUrl": "assets/images/lemonGrass.jpg",
//         "starRating": 2.5


//     },
//     {
//         "_id": 3,
//         "productName": "Thyme",
//         "productCode": "HERB-THY",
//         "description": "It is a mediterranean herb with dietary, medicinary and ornamental uses",
//         "price": 250.5,
//         "releaseDate": new Date(2021, 7, 9),
//         "imageUrl": "assets/images/Thyme.jpg",
//         "starRating": 4.5,

//     }
// ])