const express = require ('express');
const product = require('./../../helpers/product_db');
const service = require('./../../helpers/products/service_db');
const router = express.Router();

router.get('/all', (req, res) => {
    service.all().then( services => {
        res.send({ 
            status: 200,
            services
        })
    }).catch(err => {
        res.send({
            status: 404
        })
    })
})

router.get('/latest', (req, res) => {
    service.latest().then(products => {
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

router.post('/new', (req, res) => {
    console.log(req.body)
    const { title, description, category, post_time } = req.body
    product.new(req.user.person_id, title, description, 'service', category).then(new_product => {
        const { product_id } = new_product
        service.new(product_id, post_time).then(data => {
            res.send({ status: 200 })
        }).catch(err => {
            console.log(err)
            res.send({ status: 501 })
        })
    }).catch(err => {
        console.log(err)
        res.send({ status: 500 })
    })
})

router.post('/edit', (req, res) => {
    const {  } = req.body
    service.edit().then(data => {
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
    service.delete(id).then(data => {
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
    service.show(id).then(details => {
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