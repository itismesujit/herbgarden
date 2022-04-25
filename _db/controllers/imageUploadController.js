const express = require('express'),
    router = express.Router(),
    multer = require('multer');

const Picture = require('../models/picture');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}



const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("invalid mime type");
        if(isValid){
            error=null;
        }
        cb(error, "./images");
    },
    filename:  (req, file, cb) => {
        const name = file.originalname
        .toLocaleLowerCase()
        .spilt(' ')
        .join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

// this.upload = multer({
//     storage: this.storage
// });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const isValid = MIME_TYPE_MAP[file.mimetype];
//         let error = new Error('Invalid mime type');
//         if (isValid) {
//             error = null;
//         }
//         cb(null, "downloads/images")
//     },
//     filename:function (req, file, cb) {
//         const name = file.originalname.toLocaleLowerCase().spilt(' ').join('_');
//         const ext = MIME_TYPE_MAP[file.mimetype];
//         cb(null, name + '_' + Date.now() + '.' + ext)
//     }
// });



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

const upload = multer({
    storage: storage
})



exports.imgUpload = (multer(storage).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    console.log(JSON.stringify(req.body) + '   req.body');
    console.log(JSON.stringify(req.file) + '   req.file');
    console.log(JSON.stringify(req.param) + '   req.param');
    const picture = new Picture({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + 'downloads/images/' + req.file?.filename
    });
    picture.save()
        .then(result => {
            res.status(201)
                .json({
                    message: 'Picture created !',
                    // result:result,
                    post: {
                        id: result._id,
                        content: result.content,
                        imagePath: result.imagePath
                    }
                });

        }).catch(err => {
            res.status(500).json([
                // error.err
                // error
            ])
        })
})