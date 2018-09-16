import db from '../database/db'
import { trade } from '../database/queries'

const create = (product_id, seller_id, buyer_id)=>{
    const addTrade = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(trade.new, [product_id, seller_id, buyer_id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(addTrade)
}

const check = (product_id, seller_id, buyer_id)=>{
    const confirmExists = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(trade.check, [product_id, seller_id, buyer_id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(confirmExists)
}

export { create, check }
