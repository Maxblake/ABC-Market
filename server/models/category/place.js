import db from '../../database/db'
import { place } from '../../database/queries'

const latest = () =>{
    const show = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(place.latest)
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



const create = (user_id, title, description, type, category, location, post_time, specification, schedule, address, link) =>{
    const addPlace = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(place.new, [user_id, title, description, type, category, location, post_time, specification, schedule, address, link])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(addPlace)
}


const erase = id =>{
    const eliminate = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.none(place.delete, [id])
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
                const data = await object.any(place.by_genre, [genre])
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
                const data = await object.any(place.search, [name, category])
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