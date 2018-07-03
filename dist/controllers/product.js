const express = require('express');
const product = require('./../helpers/product_db');
const multer = require('multer');
const cloudinary = require('cloudinary');
const router = express.Router();

router.get('/all',(req,res)=>{
  product.show_all_products().then(list=>{
    res.send({
      list
    })
  }).catch((err)=>{
    console.log(err)
    res.send({ 
      status: 500
    })
  })
})

router.get('/:id', (req,res)=> {
  (req.user === undefined) ? user_id = null : user_id = req.user.id
  product.show_product(req.params.id).then(product =>{
    res.send({
      product, 
      user_id
    })
  }).catch((err)=>{
    res.send({ 
      status: 500
    })  
  })
})

router.get('/delete/:id', (req, res) => {
  product.delete_product(req.params.id).then(data=>{
    res.send({msg:data});
  }).catch((err)=> {
    res.send({ 
      status: 500
    })  
  })
})

router.post('/update/', (req, res)=> {
  product.update_product(req.body.price, req.body.description,  req.body.stock, req.body.type_supplier, req.body.brand, req.body.department, req.body.code, req.body.product_id).then((data)=> {
      res.send({msg:data});
      }).catch((err)=> {
        throw err;
  });
});

cloudinary.config({
  cloud_name: 'zingaring',
  api_key: '195729922234217',
  api_secret: 'rul2JCiaHBPULlxuKDd04N5zFJ8'
})

let upload = multer({dest: "./uploads/"});

router.post('/new', upload.array('files[]'), async (req, res) => {
//  const user_id = req.user.id
 multipleUpload = new Promise(async (res, rej) => {
   let arr = []
   for (var i in req.files) {
     await cloudinary.uploader.upload(req.files[i].path, result => {
         arr.push(result.secure_url);
         if (arr.length === req.files.length) {
             res(arr);
         }
       })
     }
   })
   .then(result => result)
   .catch(error =>  error)
 
 consume = await multipleUpload.then(data => {
   const { description, price, stock, name } = req.body
   product.new(9, description, price, stock, name).then(async new_product => {
       for (var i in data) {
           await product.add_image(new_product[0].id, data[i]).then(success => {
           }).catch(async err => {
               res.send({ 
                   status: 503 
               })
           })
       }
       res.send({ 
           status: 200 
       })
   }).catch(err => {
       console.log(err)
   })
 })
})


module.exports = router;