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

router.get('/latest', (req, res) => {
    place.latest().then(products => {
        res.send({ 
            status: 200,
            products
        })
    }).catch(err => {
        console.log(err)
        res.send({
            status: 404
        })
    })
})

router.post('/new', upload.array('files[]'), async (req, res) => {
    const { title, description, category, specialty, schedule, address, post_time, link, location } = req.body
    const multipleUpload = new Promise(async (res, rej) => {
        let arr = []
        for (var i in req.files) {
            await cloudinary.uploader.upload(req.files[i].path, result => {
                if (result.error) return rej(result.error)
                arr.push(result.secure_url);
                if (arr.length === req.files.length) {
                    res(arr);
                }
            })
        }
    })

    const consume = await multipleUpload.then(data => {
        place.new(req.user.person_id, title, description, 'place', category, location, post_time, specialty, schedule, address, link).then(async new_product => {
            const { product_id } = new_product
            for (var i in data) {
                try {
                    await product.add_image(product_id, data[i])
                } catch (e) {
                    console.log(e)
                    res.send({ status: 404 })
                }
            }
            res.send({ status: 200 })
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

router.get('/category/:category', async (req, res) => {
    const { category } = req.params
    console.log(category)
    try {
        const products = await place.by_genre(category)
        res.send({ 
            status: 200,
            products
        })
    } catch (err) {
        console.log(err)
        res.send({ status: 500 })
    }
})


router.post('/search', async (req, res) => {
    const { name, category } = req.body
    try {
        const products = await place.search(name, category)
        res.send({ 
            status: 200,
            products
        })
    } catch (err) {
        console.log(err)
        res.send({ status: 500 })
    }
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