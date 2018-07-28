const express = require ('express');
const product = require('./../../helpers/product_db');
const place = require('./../../helpers/products/place_db');
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
    place.all().then(async places => {
        console.log(places)
        for (var i in places) {
            const images = await product.images(places[i].product_id)
            places[i]['img'] = images[0]
        }
        res.send({ 
            status: 200,
            places
        })
    }).catch(err => {
        res.send({
            status: 404
        })
    })
})

router.post('/new', upload.array('files[]'), async (req, res) => {
    const { title, description, category, specification, schedule, address, link } = req.body

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
            place.new(product_id, specification, schedule, address, link).then(data => {
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
    place.edit().then(data => {
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
    place.delete(id).then(data => {
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
    place.show(id).then(details => {
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