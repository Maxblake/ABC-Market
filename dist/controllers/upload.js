const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const Product = require('./../helpers/product_db');

cloudinary.config({
   cloud_name: 'zingaring',
   api_key: '195729922234217',
   api_secret: 'rul2JCiaHBPULlxuKDd04N5zFJ8'
});

let upload = multer({dest: "./uploads/"});
let router = express.Router();

router.post('/upload_product',upload.array('files[]'), async(req,res)=>{
  let multipleUpload = new Promise(async (res, rej) => {
    let arr = [];
    console.log(req.body)
    for (let i=0; i<req.files.length; i++) {
      await cloudinary.uploader.upload(req.files[i].path, (result) => {
          arr.push(result.secure_url);
          if (arr.length === req.files.length) {
              res(arr);
          }
        });
      }
    })
   .then((result) => result)
   .catch((error) =>  error)

    let test = await multipleUpload.then((data) => {
      for (var i=1; i<4; i++) {
        if (data[i] === undefined) {
          data[i] = null;
        }
      }
      if (Product.add_product(req.user.id, req.body.stock, req.body.price, req.body.description,
                              req.body.name, data[0], data[1], data[2], data[3], data[4])) {
        res.send({status:200});
      } else {
        res.send({status:500})
      }
    });
});


module.exports = router;
