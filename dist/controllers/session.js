const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth')
const User = require('./../helpers/user_db');
const router = express.Router();
var ip = require("ip");

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
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).send({
                  status: 'Could not log in user'
                })
            }
            res.status(200).send({
                status:200, user
            })
        })
    })(req, res, next);
});

router.post('/signup',auth.isLogged, (req, res, next) => {
    const { name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address } = req.body
    User.new(name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address).then(data => {
        res.send({
            status:200
        })
    }).catch(err => {
        res.send({
            status:500
        })
    })
})

router.get('/checkSession', auth.isAuth, async (req, res) => {
    const user = await User.id(req.user.person_id)
    res.send({ status: 200, user })
})

router.get('/ip', (req,res,next) => {
    res.send({ ip: ip.address()})
})

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout();
    res.send({
        status: 200
    })
})

module.exports = router;
