import { db } from '../../database/db'
import { offer } from '../../database/queries'

const latest = () => {
    const latestOffers = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(offer.latest)
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(latestOffers)
}

const create = (user_id, title, description, type, category, location, post_time, product_id, address, price) =>{
    const addOffer = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(offer.new, [user_id, title, description, type, category, location, post_time, product_id, address, price])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(addOffer)
}

const byGenre = id => {
    const type = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(offer.by_genre, [id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(type)
}

const search = (name, category) => {
    const find = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(offer.search, [name, category])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(find)
}

const erase = id => {
    const drop = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(offer.delete, [id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(drop)
}

export { latest, create, erase, byGenre, search }