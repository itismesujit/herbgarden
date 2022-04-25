// const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.spilt(" ")[1];
//         jwt.verify(token, "secret_this_should_be_longer");
//         next();
//     }
//     catch(error){
//         res.status(401).json({message:"Authorization failed"})
//     }
// }


const jwt=require('jsonwebtoken');

module.exports=(req,res,next) =>{
   try{
       const token =req.headers.authorization.split(" ")[1];
       jwt.verify(token, "secret_this _should_be_longer");
       next();
   }
   catch(error){
       res.status(400).json({
           message:"Authentication failedd"
       })
   }
}