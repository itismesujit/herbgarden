const express =require('express');
const router=express.Router();
const Product=require('../models/productModel')
const checkAuth=require("../middleware/check-auth")



//Get All Product
  router.get("",(req,res)=>{
     Product.find({}).exec().then((productData) => {
            res.status(200);
            res.send(productData);
    })
    .catch((error)=>{
        console.log(error.message);
        res.status(204);
        res.send("Invalid ID/ ID doesn't exists- Information",+error.message);
    })
    .then(()=>console.log("promise complete"));
 });


//Get by Id
// exports.getProductById=
router.get("/:id",(req,res)=>{
    pId=req.params.productId;
    Product.findOne({id: {$gte:pId} }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            res.send(docs);
        }
    });
})


//Update partialUpdate
router.patch("/:id", checkAuth,(req,res)=>{
    pId=req.params.productId;
    Product.findOneAndUpdate({id: {$gte:pId} }, req.body).exec().then(data=>{
        if (!data) {
                return res.status(404).send();
            }
      return  res.send(data);
    })
    .catch((error)=>{
        console.log(error.message);
        res.status(204);
        res.send("Invalid ID/Id doesn't exists - Information :"+error.message);
    })
    // .then(()=> console.log("promise completed for update"));
}),

//Delete Product
router.delete("",(req,res)=>{
    let pId=req.params.productId;
    Product.deleteOne({id:{$gte:pId}}).then(function(){data=>{
        res.send(data)
    }})
    .catch((error)=>{
        console.log(error.message);
        res.status(204);
        res.send("Invalid ID/Id doesn't exists - Information :"+error.message);
    })
    .then(()=> console.log("promise completed for delete"));
}
)
//Create Product
router.post("",(req,res)=>{
    let product=req.body;
    Product.create(product).then(data=>{
        res.status(201);
        res.send(data)
    })

    .catch((error)=>{
        console.log(error.message);
        res.status(204);
        res.send("Invalid ID/Id doesn't exists - Information :"+error.message);
    })
    .then(()=> console.log("promise completed for create"));
})
module.exports=router;

