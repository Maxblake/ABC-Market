import { Router } from 'express'
import passport from 'passport'
import { createUser, id, tradeDetails, contactDetails } from '../../models/user'
import { isAuth } from '../../middleware/isAuth';
const session = Router()

const login = (req, res, next) => {
    const { username, password } = req.body.credentials
    req.body.username = username
    req.body.password = password
    passport.authenticate('local', (error, user, info) => {
        if(error){
            console.log(error)
            return next(error)
        }
        if(!user) {
            return res.send({status: info })
        }
        req.logIn(user, (error)=> {
            if (error) {
                return res.status(500).send({ status: 'Could not log in', error })
            }
            res.send({ status: 200, user })
        })
    })(req, res, next)
}

const checkSession = async (req, res) => {
    const user = await id(req.user.person_id)
    res.send({ status: 200, user })
}

const logout = (req, res) => {
    req.logout()
    res.send({ status: 200 })
}

session.get('/checkSession', isAuth, checkSession)
session.get('/logout', logout)
session.post('/login', login)

export default session
