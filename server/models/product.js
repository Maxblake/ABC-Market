import db from '../database/db'
import { product } from '../database/queries'

const productImages = id => {
    const show = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(product.images, [id])
                console.log(data)
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(show)
}

const addImage = (product_id, url)=>{
    const add = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.none(product.add_images, [product_id, url])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(add)
}

const category = id => {
    const kind = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(product.type, [id])
                res(data)
                object.done()
            } catch (error) {
                console.log('here in cat')
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(kind)
}

const show = (category, id) => {
    const details = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(category == 'article' ? product.show_article : (category == 'offer') ? product.show_offer : (category == 'place') ? product.show_place : (category == 'service') ? product.show_service :  product.show_vehicle, [id])
                res(data)
                object.done()
            } catch (error) {
                console.log('here in show')
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(details)
}


const userUploads = (seller_id) => {
    const uploads = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(product.user_uploads, [seller_id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(uploads)
}

export { productImages, category, show, userUploads, addImage }