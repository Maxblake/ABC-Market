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

router.post('all', (req, res) => {
    
})

router.post('/new', upload.array('files[]'), async (req, res) => {
    const { fuel, negotiable, finance, interior, onlyOwner, windows, steer, ac, time, location, description, title } = req.body

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
            for (var i in data) {
                await product.add_image(new_product[0].product_id, data[i]).then(success => {
                    console.log(`Image #${i} has been added`)
                }).catch(err => {
                    res.send({ status: 503 })
                })
            }
            vehicle.new(product_id, brand, model, fuel, negotiable, finance, int_material, unique_owner, post_time, origin,  windows, pilot_seat, air_cond).then(data => {
                res.send({ 
                    status: 200 
                })
            }).catch(err => {
                res.send({ status: 501 })
            })
        }).catch(err => {
            res.send({ status: 500 })
        })
    })
})

router.post('/edit', (req, res) => {

})

router.post('/erase', (req, res) => {

})

router.get('/show/:id', (req, res) => {

})

module.exports = router;