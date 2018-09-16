import 'babel-polyfill';
import express from 'express'
import path from 'path'
import session from 'express-session'
import passport from 'passport'
import './env'
import localStrategy from './controllers/auth/localStrategy'
import morgan from 'morgan'
import http from 'http'
import socket from 'socket.io'
import webpack from 'webpack'
import dev_webpack_config from '../webpack.dev.config.js'
import prod_webpack_config from '../webpack.prod.config.js'
import chat from './channel/websocket'
import routes from './routes'
import webpack_hot from 'webpack-hot-middleware'
import webpack_dev from 'webpack-dev-middleware'

const app = express();
const server = http.Server(app)
const io = socket(server)
const socket_connection = chat(io)
const environment = (process.env.NODE_ENV !== 'production') ? dev_webpack_config : prod_webpack_config
const compiler = webpack(environment)
const port = process.env.PORT || 3000;

const requestHeaders = (req, res, next) => {  
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Credentials", true)
    next()
}

const sessionObject = session({ 
    secret:'keyboardcat',
    resave: false,
    saveUninitialized: false
})

const toggleSerializeUser = (user, done) => done(null, user)
const wildcardCallback = (_, res) => res.sendFile(path.join(__dirname, '../dist/index.html'))

const appUse = (a, b) => b ? app.use(a, b) : app.use(a)
const hotReload =  webpack_hot(compiler)
const webpackMiddleware = webpack_dev(compiler, { noInfo: true, publicPath: environment.output.publicPath })
const expressObjects = [ express.json(), express.urlencoded({ extended:false }), morgan('combined') ]
const passportObjects = [ sessionObject, passport.initialize(), passport.session() ]
const toUse = [ requestHeaders, webpackMiddleware, hotReload, ...expressObjects, ...passportObjects ]
toUse.forEach(object => ( appUse(object) ))

passport.use(localStrategy)
passport.serializeUser(toggleSerializeUser)
passport.deserializeUser(toggleSerializeUser)

appUse('/', routes())
appUse('*', wildcardCallback )
server.listen(port);
