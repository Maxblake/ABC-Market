const express = require ('express');
const history = require('../helpers/chat_db.js')
const trade = require('../helpers/trade_db')
const router = express.Router();

router.get('/history/:id', async (req, res) => {
    try {
        const messages = history.show(req.params.id)
        res.send({ 
            status: 200,
            messages
        })
    } catch(e) {
        console.log(err)
        res.send({ status: 500 })
    }
})

router.post('/trade/new', (req, res) => {
    const { product_id, buyer_id, seller_id } = req.body
    trade.new(product_id. buyer_id, seller_id).then(success => {
        res.send({ status: 200 })
    }).catch(err => {
        res.send({ status: 404 })
    })
})

module.exports = router;
