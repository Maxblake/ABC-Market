import { Router } from 'express'
import session from '../controllers/auth/session'
import users from '../controllers/users'
import products from './products'

export default () => {
    let router = Router()
    router.use('/users', users)
    router.use('/product', products())
    router.use('/', session)
    return router
}

