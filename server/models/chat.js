import db from '../database/db'
import { chat } from '../database/queries'

const show = trade_id => {
    const get = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(chat.show, [trade_id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(get)
}

const newMessage = (trade_id, sender_id, message, time) => {
    const createMessage = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.none(chat.new_message, [trade_id, sender_id, message, time])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(createMessage)
}

export { show, newMessage }