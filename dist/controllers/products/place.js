const express = require ('express');
const product = require('./../../helpers/product_db');
const place = require('./../../helpers/products/place_db');
const multer = require('multer');
const cloudinary = require('cloudinary');
const router = express.Router();

router.post('all', (req, res) => {

})

router.post('/new', (req, res) => {

})

router.post('/edit', (req, res) => {

})

router.post('/erase', (req, res) => {

})

router.get('/show/:id', (req, res) => {
    console.log('a')
    res.send({ msg: 'working' })
})

module.exports = router;