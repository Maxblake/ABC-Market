const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth')
let user = require('./../helpers/user_db');
let router = express.Router();

router.post('/login', auth.isLogged, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info)
            return res.status(200).send({
              status: info
            })
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).send({
                  status: 'Could not log in user'
                })
            }
            res.status(200).send({
                status:200
            })
        })
    })(req, res, next);
});

router.post('/signup',auth.isLogged, (req, res, next) => {
    const { name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address } = req.body
    user.new(name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address).then(data => {
        res.send({
            status:200
        })
    }).catch(err => {
        res.send({
            status:500
        })
    })
})

router.get('/value', auth.isAuth, (req,res,next) => {
    console.log(req.get('host'))
    user.id(req.user.id).then(user => {
        res.send({ status: 200, user })
    }).catch(err => {
        res.send({ status: 500})
    })
})

router.get('/logout',auth.isAuth ,(req, res) => {
    req.logout();
    res.status(200).send({
        status: 'Bye!'
    })
})

module.exports = router;
