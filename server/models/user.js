import db from '../database/db'
import bcrypt from 'bcryptjs'
import { user } from '../database/queries'

const productImages = id => {
    const show = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(product.images, [id])
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

 const byUsername = username => {
    const find = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(user.by_username, [username])
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

 const id = id => {
    const find = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(user.by_id, [id])
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

 const comparePassword = (candidatePassword, hash) => {
    return new Promise((res,rej) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw rej(err)
            res(isMatch)
        })
    })
}

 const createUser = (body)=>{
    var { name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address } = body
    const create = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.none(user.new, [name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(create)
}

 const tradeDetails = id => {
    const trade = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.one(user.trades_details, [id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(trade)
}

<<<<<<< HEAD
 const contactDetails = id => {
=======
 const contactDetails = (id)=>{
>>>>>>> 8d41aff2f3f5c232bceef36cf8fbf37a03530b60
    const contact = (res, rej) => {
        const query = async object => {
            try {
                const data = await object.any(user.contact_details, [id])
                res(data)
                object.done()
            } catch (error) {
                rej(error)
                object.done()
            }
        }
        db.connect().then(query).catch(error => rej(error))
    }
    return new Promise(contact)
}

export { byUsername, id, comparePassword, createUser, tradeDetails, contactDetails }