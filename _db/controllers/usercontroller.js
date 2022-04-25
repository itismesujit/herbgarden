// const bcrypt = require('bcrypt');
// const User = require('../models/user');

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10).then(hash => {
//         const user = new User({
//             email: req.body.email,
//             password: hash
//         });
//         user.save().then(result => {
//             res.status(201).json({
//                 message: "User created",
//                 result: result
//             });
//         }).catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         })
//     })
// } //signup ends

// exports.login = (req, res, next) => {
//         let fetcheduser;
//         User.findOne({
//                 email: req.body.email
//             })
//             .then(user => {
//                 if (!user) {
//                     return res.status(401).json({
//                         message: "Authentication Failed: User not found"
//                     })
//                 }

//                 fetcheduser = user;
//                 return bcrypt.compare(req.body.password, user.password)
//             })
//             .then(result => {
//                 console.log(result, '<==from line no.39');
//                     if (!result) {

//                         return res.status(401).json({
//                             message: "Authentiation Failed: Password did not matched."
//                         })
//                     }

//                     const token = jwt.sign({
//                             email: fetcheduser.email,
//                             userId: fetcheduser._id
//                         },
//                         "secret_this _should_be_longer", {
//                             expiresIn: "1h"
//                         }
//                     );
//                     console.log(token, '<== line no.');
//                     res.status(200).json({
//                         token: token,
//                         expriesIn: 3600
//                     })
//                 }
//             )

//     .catch(err => {
//         return res.status(401).json({
//             message: "Authenticate Failed"
//         })
//     }) 

// }




const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../models/user');
const Users = require('../userModel')

exports.signup =(req,res,next) =>{
    bcrypt.hash(req.body.password,10).then(hash => {
        const user =new User({
            email:req.body.email,
            password:hash
        });

        user.save()
       .then(result =>{
           res.status(201)
           .json({
               message:"User created !",
               result:result
           });
       }).catch( err => {
           res.status(500).json({
               error:err
           });
       });
    });
} //signup ends

exports.changerole =(req,res,next) =>{
    console.log(req.params.userId + '+ req.params.newRole ');
    console.log(JSON.stringify(req.body) + '       req.body');

    Users.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    }).exec().then(data => {
        res.send(data)
    })
    .catch((error) => {
        console.log(error.message);
        express.status(204);
        res.send('Invalid ID/Id does not exists - information :' + error.message);
    })
    .then(() => console.log('Promise complete for partial update | Role changed.'));
    
    
    
    // income;oer
    // let _id = req.params.email;
    // let productParams = req.body;
    // delete productParams._id;
    // Product.findByIdAndUpdate(_id, {
    //         $set: productParams
    //     }).exec().then(data => {
    //         res.send(data)
    //     })
    //     .catch((error) => {
    //         console.log(error.message);
    //         express.status(204);
    //         res.send('Invalid ID/Id does not exists - information :' + error.message);
    //     })
    //     .then(() => console.log('Promise complete for update'));
} //signup ends


exports.login =(req,res,next) =>{
    let fetcheduser;
    User.findOne({email:req.body.email})
    .then(user =>{
      if(!user)
      {   return res.status(401).json({
              message:"Authentication Failed: User not found"
          })
      }  //end of if

      //if user is found store it
      fetcheduser=user;
      return bcrypt.compare(req.body.password,user.password)
    }) 
    .then(result => {
        if(!result){
            return res.status(401).json({
                message:"Authentication Failed: password did not match"
            })
        } //end of if password does not match

        //if password matches create jwt and attach to the response
        const token= jwt.sign(
            {email:fetcheduser.email, userId:fetcheduser._id },
            "secret_this _should_be_longer",
            {expiresIn:"1h"}
        );
        res.status(200).json({
          token:token,
          expiresIn:3600  
        })

    })  //end of then  for resolve

    .catch(err=>{
        return res.status(401).json({
            message:"Authentication Failed"
        })
    });

}//login ends