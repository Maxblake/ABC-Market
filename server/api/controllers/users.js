import { Router } from 'express'
import passport from 'passport'
import { createUser, byId, tradeDetails, contactDetails } from '../../models/user'
import { isAuth } from '../../middleware/isAuth';
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
users.post('/new', create)

export default users