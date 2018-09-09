const db = require('./db')
const bcrypt = require('bcryptjs')
const user = require('./queryfile').user

module.exports.getUserByUsername = username=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one(user.by_username,[username]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            rej(error)
        })
    })
}

module.exports.id = id=>{
    return new Promise((res,rej)=>{
         db.connect().then((obj)=>{
            obj.one(user.by_id, [id]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            rej(error)
        })
    })
}

module.exports.comparePassword = (candidatePassword, hash)=>{
    return new Promise((res,rej) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw rej(err)
            res(isMatch)
        })
    })
}

module.exports.new = (body)=>{
    var { name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address } = body
    return new Promise((res,rej)=>{
        let hashedPass = bcrypt.hashSync(password, 10)
        password = hashedPass
        db.connect().then((obj)=>{
            obj.any(user.new, [name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                console.log(error)
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            console.log(error)
            rej(error)
        })
    })
}

module.exports.trades_details = (id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any(user.trades_details, [id]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            rej(error)
        })
    })
}

module.exports.contact_details = (id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any(user.contact_details, [id]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            rej(error)
        })
    })
}