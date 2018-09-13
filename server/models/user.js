import db from '../database/db'
import bcrypt from 'bcryptjs'
import { user } from '../database/queries'

 export const byUsername = username=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one(user.by_username,[username]).then((data)=>{
                  console.log(data)
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

 export const id = id=>{
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

 export const comparePassword = (candidatePassword, hash)=>{
    return new Promise((res,rej) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw rej(err)
            res(isMatch)
        })
    })
}

 export const createUser = (body)=>{
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

 export const trades_details = (id)=>{
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

 export const contact_details = (id)=>{
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