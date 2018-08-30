const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./helpers/config');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
require('./controllers/chat.js')(io);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpack_config = require('../webpack.dev.config.js')
    const compiler = webpack(webpack_config)
    app.use(require('webpack-hot-middleware')(compiler));
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpack_config.output.publicPath
    }));
}

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
