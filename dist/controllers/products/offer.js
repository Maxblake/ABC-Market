const express = require ('express');
const product = require('./../../helpers/product_db');
const offer = require('./../../helpers/products/offer_db');
const multer = require('multer');
const cloudinary = require('cloudinary');
const router = express.Router();

cloudinary.config({
    cloud_name: 'zingaring',
    api_key: '195729922234217',
    api_secret: 'rul2JCiaHBPULlxuKDd04N5zFJ8'
})
  
const upload = multer({dest: "./uploads/"});

router.get('/all', (req, res) => {
    offer.all().then(async offers => {
        for (var i in offers) {
            const images = await product.images(offers[i].product_id)
            offers[i]['img'] = images[0]
        }
        res.send({ 
            status: 200,
            offers
        })
    }).catch(err => {
        res.send({
            status: 404
        })
    })
})

router.post('/new', upload.array('files[]'), async (req, res) => {
    const { title, description, start, finish, address, category } = req.body

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

    consume = await multipleUpload.then(data => {
        product.new(1, title, description, category).then(async new_product => {
            const { product_id } = new_product
            for (var i in data) {
                await product.add_image(product_id, data[i]).then(success => {
                }).catch(err => {
                    console.log(err)
                    res.send({ status: 503 })
                })
            }
            offer.new(product_id, start, finish, address).then(data => {
                res.send({ status: 200 })
            }).catch(err => {
                console.log(err)
                res.send({ status: 501 })
            })
        }).catch(err => {
            console.log(err)
            res.send({ status: 500 })
        })
    }).catch(err => {
        console.log(err)
        res.send({ status: 400 })
    })

})

router.post('/edit', (req, res) => {
    const {  } = req.body
    offer.edit().then(data => {
        res.send({
            status: 200
        })
    }).catch(err => {
        res.send({
            status: 403
        })
    })
})

router.post('/erase', (req, res) => {
    const { id } = req.body
    offer.delete(id).then(data => {
        res.send({ 
            status: 200
        })
    }).catch(err => {
        res.send({ 
            status: 404
        })
    })
})

router.get('/show/:id', (req, res) => {
    const { id } = req.params
    offer.show(id).then(details => {
        res.send({ 
            status: 200,
            details
        })
    }).catch(err => {
        res.send({
            status: 404
        })
    })
})

module.exports = router;