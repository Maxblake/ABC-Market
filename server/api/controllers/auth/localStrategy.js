import passport from 'passport'
import { Strategy as localStrategy } from 'passport-local'
import { byUsername, comparePassword } from '../../../models/user'
const userProperties = { usernameField: 'username', passwordField: 'password' }
const userByUsername = async (username, password, done) => {
    console.log(username, password)
    try {
        const user = await byUsername(username)
        console.log(user)
        // console.log('user', user.passport_digest, password);
        if(user.error) done(null, false, { message: 'username not found in our records' })
        // console.log('password', password == user.passport_digest);
        comparePassword(password, user.password).then(isMatch => {
            (isMatch) ? done(null, user) : done(null, false)
        })
    
    } catch (error) {
        console.log(error)
        return done(null, false)
    }
}

export default new localStrategy(userProperties, userByUsername)
