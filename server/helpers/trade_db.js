const db = require('./db')
const trade = require('./queryfile').trade

module.exports.new = (product_id, seller_id, buyer_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one(trade.new, [product_id, seller_id, buyer_id]).then((data)=>{
                console.log(data)
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

module.exports.check = (product_id, seller_id, buyer_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one(trade.check,[product_id, seller_id, buyer_id]).then((data)=>{
                res(data)
                obj.done()
            }).catch((error)=>{
                rej(error)
                obj.done()
            })
        }).catch((error)=>{
            console.log(error)
            rej(error)
        })
    })
}
