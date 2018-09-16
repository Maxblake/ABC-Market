import { Router } from 'express'
import { show, newMessage } from '../models/chat'
import { create, check } from '../models/trade'

const trades = Router()

trades.get('/history/:id', async (req, res) => {
    try {
        const messages = await show(req.params.id)
        res.send({ 
            status: 200,
            messages
        })
    } catch(e) {
        console.log(e)
        res.send({ status: 500 })
    }
})

trades.post('/trade/new', async (req, res) => {
    const { product_id, buyer_id, seller_id } = req.body 
    try {
        const success = await create(product_id. buyer_id, seller_id)
        res.send({ status: 200 })
    } catch (error) {
        res.send({ status: 404 })
    }
})

trades.post('/new_message_from_product', async (req, res) => {
    const { product_id, message } = req.body
    const seller_id = req.body.person_id
    const buyer_id = req.user.person_id
    const date = new Date()
    const time = `${date.toDateString()}  ${date.toLocaleTimeString()}`
    let id
    try {
        const check = await check(product_id, seller_id, buyer_id)	
        id = check.trade_id		
    } catch (e) {
        const new_trade = await create(product_id, seller_id, buyer_id) 
        id = new_trade.trade_id   
    }
    
    try {
        const msg = await newMessage(id, buyer_id, message, time)
        res.send({ status: 200, id })   
    } catch (e) {
        console.log(e)
        res.send({ status: 500 })
    }

})

export default trades