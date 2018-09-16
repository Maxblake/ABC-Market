import { Router } from 'express'
import session from '../controllers/auth/session'
import users from '../controllers/users'
import trades from '../controllers/trades'
import products from './products'

export default () => {
    let router = Router()
    router.use('/user', users)
    router.use('/product', products())
    router.use('/trade', trades)
    router.use('/', session)
    return router
}

