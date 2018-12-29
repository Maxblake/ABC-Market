import { db } from '../../database/db'
import { vehicle } from '../../database/queries'

const all = () =>{
    const show = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(vehicle.all)
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



const create = (user_id, title, description, type, category, location, post_time, brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner,  windows, pilot_seat, air_cond) =>{
    const addVehicle = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(vehicle.new, [user_id, title, description, type, category, location, post_time, brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner,  windows, pilot_seat, air_cond])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(addVehicle)
}


const erase = id =>{
    const eliminate = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.none(vehicle.delete, [id])
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

const search = (name) => {
    const find = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(vehicle.search, [name])
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

export { all, create, erase, search }