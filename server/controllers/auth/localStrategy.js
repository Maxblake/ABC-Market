import { Strategy as localStrategy } from 'passport-local'
import { byUsername, comparePassword } from '../../models/user'
const userProperties = { usernameField: 'username', passwordField: 'password' }
const userByUsername = async (username, password, done) => {
    try {
        const user = await byUsername(username)
        console.log(user)
        if(user.error) done(null, false, { message: 'username not found in our records' })
        const isMatchCallback = isMatch => {
            (isMatch) ? done(null, user) : done(null, false)
        }
        comparePassword(password, user.password).then(isMatchCallback).catch(e => console.log(e))
    } catch (error) {
        console.log(error)
        return done(null, false)
    }
}

export default new localStrategy(userProperties, userByUsername)
