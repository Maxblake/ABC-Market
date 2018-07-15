const express = require ('express');
const product = require('./../../helpers/product_db');
const vehicle = require('./../../helpers/products/vehicle_db');
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
    vehicle.all().then(vehicles => {
        res.send({ 
            vehicles
        })
    }).catch(err => {
        res.send({
            status: 404
        })
    })
})

router.post('/new', upload.array('files[]'), async (req, res) => {
    const { brand, model, distance, year, fuel, negotiable, finance, interior, unique_owner, windows, steer, ac, time, location, description, post_time } = req.body

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
        product.new(1, 'test', 'test', 'vehicle').then(async new_product => {
            const { product_id } = new_product
            for (var i in data) {
                await product.add_image(product_id, data[i]).then(success => {
                }).catch(err => {
                    console.log(err)
                    res.send({ status: 503 })
                })
            }
            vehicle.new(product_id, brand, model, distance, year, fuel, negotiable, finance, interior, unique_owner, post_time, location, windows, steer, ac).then(data => {
                res.send({ 
                    status: 200 
                })
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
        res.send({ status: 400})
    })

})

router.post('/edit', (req, res) => {
    const { brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, post_time, location, windows, pilot_seat, air_cond, vehicle_id } = req.body
    vehicle.edit(brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, post_time, location, windows, pilot_seat, air_cond, vehicle_id).then(data => {
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
    vehicle.delete(id).then(data => {
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
    vehicle.show(id).then(details => {
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