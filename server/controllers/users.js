import { Router } from 'express'
import passport from 'passport'
import { createUser, byId, tradeDetails, contactDetails } from '../models/user'
import { isAuth } from '../middleware/isAuth';
const users = Router()

const create = async (req, res) => {
    const { credentials } = req.body
    const { username, password } = credentials
	try {
		const id = await createUser(credentials)
		res.send({ status: 200 })
	} catch (error) {
		const message = (error.constraint == 'user_email') ? { status: 403, error: 'Email already registered' } : { status: 404, error }
		res.send(message)
	}
}

const contacts = async (req,res) => {
    try {
        const { person_id } = req.user
        const trades = await tradeDetails(person_id)
        for (var i in trades) {
            const { buyer_id, seller_id } = trades[i]
            if (buyer_id == person_id) {
                var contact = await contactDetails(seller_id)
                trades[i]['details'] = contact
            } else {
                var contact = await contactDetails(buyer_id)
                trades[i]['details'] = contact    
            }
        }
        res.send({ 
            status: 200,
            trades
        })
    } catch (e) {
        console.log(e)
    }
}

users.get('/contacts', isAuth, contacts)
users.post('/new', create)

export default users