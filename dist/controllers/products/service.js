const express = require ('express');
const product = require('./../../helpers/product_db');
const service = require('./../../helpers/products/service_db');
const router = express.Router();


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
    const { title, description, category, post_time, location } = req.body
    service.new(req.user.person_id, title, description, 'service', category, location, post_time).then(new_product => {
        res.send({ status: 200 })        
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