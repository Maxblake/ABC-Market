const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const webpack = require('webpack');
const dev_webpack_config = require('../webpack.dev.config.js')
const prod_webpack_config = require('../webpack.prod.config.js')
let config
require('./controllers/chat.js')(io);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

if (process.env.NODE_ENV !== 'production') {
    config = require('../webpack.dev.config.js')
    app.use(require('webpack-hot-middleware')(webpack(config)));
    app.use(require('webpack-dev-middleware')(webpack(config), {
        noInfo: true,
        publicPath: config.output.publicPath
    }))
} else {
    config = require('../webpack.prod.config.js')
}

const compiler = webpack(config);


app.use(session({
    secret:'keyboardcat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));

app.use('/',require('./controllers/'));

app.get('*',  (_, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


passport.use(require('./helpers/localStrategy'));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

server.listen(port);
