const db = require('./db')
const chat = require('./queryfile').chat

module.exports.show = trade_id=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any(chat.show, [trade_id]).then((data)=>{
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

module.exports.new_message = (trade_id, sender_id, message, time)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none(chat.new_message, [trade_id, sender_id, message, time]).then((data)=>{
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

