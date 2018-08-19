const express = require('express');
const Product = require('./../helpers/product_db');
const Contact = require('./../helpers/user_db');
const multer = require('multer');
const cloudinary = require('cloudinary');
const router = express.Router();

router.get('/detail/:id', async (req,res)=> {
    const { id } = req.params
    const general = {}
    const type = {}
    try {
        const { kind } = await Product.type(id)
        const product = await Product.show(kind, id)
        let count = 0
        for (var i in product) {
            (count < 7) ? general[i] = product[i] : type[i] = product[i]
            count++
        }
        res.send({ 
            status: 200,
            product: {
                general,
                type
            }
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

router.get('/contact/:id', async (req, res) => {
    try {
        const contact = await Contact.id(req.params.id)
        delete contact['password']
        delete contact['email']
        res.send({ 
            status: 200,
            contact
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

router.get('/by_user', async (req, res) => {
    try {    
        const products =  await Product.user_uploads(req.user.person_id)
        res.send({ 
            status: 200,
            products 
        })
    } catch (e) {
        res.send({ 
            status: 404,
        })
    }
})


module.exports = router;