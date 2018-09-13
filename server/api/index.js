import { Router } from 'express'
import session from './controllers/auth/session'
import users from './controllers/users'
export default () => {
    let api = Router()
    api.use('/users', users)
    api.use('/', session)
    return api
}

