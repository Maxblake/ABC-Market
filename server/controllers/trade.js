const express = require ('express');
const history = require('../helpers/chat_db.js')
const trade = require('../helpers/trade_db')
const router = express.Router();

router.get('/history/:id', async (req, res) => {
    try {
        const messages = await history.show(req.params.id)
        res.send({ 
            status: 200,
            messages
        })
    } catch(e) {
        console.log(e)
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

router.post('/new_message_from_product', async (req, res) => {
    const { product_id, message } = req.body
    const seller_id = req.body.person_id
    const buyer_id = req.user.person_id
    const date = new Date()
    const time = `${date.toDateString()}  ${date.toLocaleTimeString()}`
    let id
    try {
        const check = await trade.check(product_id, seller_id, buyer_id)	
        id = check.trade_id		
    } catch (e) {
        const new_trade = await trade.new(product_id, seller_id, buyer_id) 
        id = new_trade.trade_id   
    }
    
    try {
        const msg = await history.new_message(id, buyer_id, message, time)
        res.send({ status: 200, id })   
    } catch (e) {
        console.log(e)
        res.send({ status: 500 })
    }

})

module.exports = router;
