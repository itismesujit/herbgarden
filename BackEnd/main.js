const express = require('express')
const res = require('express/lib/response')



const app = express()
const port = process.env.PORT || 3000


// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits:{
//         fieldSize:10000
//     },
//     fileFilter(req,file,cb){
//        if(!this.file.originalname.match(/\.(doc|docx|pdf)$/)){
//         return  cb(new Error("File format not supported,please upload doc.docx or pdf"))
//        }
//        cb(undefined,true)
//     }
//     //     if(!file.originalname.endsWith('.pdf')){
//     //     return  cb(new Error("File format not supported,please upload pdf"))
//     //     }
//     //     cb(undefined,true)
       
        
//     // }
// })

const errorMiddleware=(req,res,next)=>{
     throw new Error("Error while processing request in middleware")
}
app.post('/upload', errorMiddleware('upload'), (req, res) => {
    res.send()
}, (error,req,res,next)=>{
    res.status(400).send({error:error.message});
})


app.use(express.json())


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})










































// const express=require("express");
// const cors=require("cors");
// const app=express();
// var corsOptions={
//     origin:"http://localhost:4200"
// }
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// const port=process.env.PORT||3000;
// const multer=require('multer');
// const upload=multer({
//     dest:'images'
// });
// app.get('',(req,res)=>{
//     res.send
// })



// app.post