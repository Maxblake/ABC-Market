const express = require('express');
let router = express.Router();
let product = require('./../helpers/product_db');


router.get('/all',(req,res)=>{
  if (req.user === undefined) {
    var user_id = null;
  } else {
    var user_id = req.user.id;
  }
  if (req.user !== undefined) {
    if (req.user.admin === false) {
      var admin = false;
    } else {
      var admin = true;
    }
  }
  product.show_all_products().then((data)=>{
        res.send({list:data, id:user_id, admin:admin});
        }).catch((err)=>{
            throw err;
        });
});

router.get('/:id', (req,res)=> {
  if (req.user === undefined) {
    var user_id = null;
  } else {
    var user_id = req.user.id;
  }
  product.show_product(req.params.id).then((data)=>{
      res.send({product:data, id:user_id});
      }).catch((err)=>{
          throw err;
      });

});

router.get('/delete/:id', (req, res) => {
  product.delete_product(req.params.id).then((data)=>{
    res.send({msg:data});
    }).catch((err)=> {
        throw err;
  });
});

router.post('/update/', (req, res)=> {
  product.update_product(req.body.price, req.body.description,  req.body.stock, req.body.type_supplier, req.body.brand, req.body.department, req.body.code, req.body.product_id).then((data)=> {
      res.send({msg:data});
      }).catch((err)=> {
        throw err;
  });
});

module.exports = router;
