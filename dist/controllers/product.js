const express = require('express');
const Product = require('./../helpers/product_db');
const multer = require('multer');
const cloudinary = require('cloudinary');
const router = express.Router();

router.get('/detail/:category/:id', async (req,res)=> {
    const { category, id } = req.params
    try {
        const product = await Product.show(category, id)
        res.send({ 
           status: 200,
           product
        })
    } catch (e) {
        console.log(e)
        res.send({ 
            status: 404
        })
    }
})

router.get('/images/:id', async (req, res) => {
    try {
        const images = await Product.images(req.params.id)
        console.log(images)
        res.send({ 
            status: 200,
            images
        })
    } catch (e) {
        console.log(e)
        res.send({
            status: 404
        })
    }
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