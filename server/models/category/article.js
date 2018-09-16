import db from '../../database/db'
import { article } from '../../database/queries'

const latest = () =>{
    const show = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(article.latest)
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



const create = (user_id, title, description, type, category, location, post_time, stock, price, used, link) =>{
    const addArticle = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(article.new, [user_id, title, description, type, category, location, post_time, stock, price, used, link])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(addArticle)
}


const erase = id =>{
    const eliminate = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.none(article.delete, [id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(eliminate)
}

const byGenre = genre => {
    const type = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(article.by_genre, [genre])
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
                const data = await object.any(article.search, [name, category])
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

export { latest, create, erase, byGenre, search }