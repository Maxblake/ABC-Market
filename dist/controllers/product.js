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
  const user_id = (req.user === undefined) ? null : req.user.id
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


module.exports = router;