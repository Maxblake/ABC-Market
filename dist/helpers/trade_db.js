const db = require('./db')

module.exports.new = (product_id, seller_id, buyer_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one('INSERT INTO trade (product_id, seller_id, buyer_id) VALUES ($1, $2, $3) returning trade_id',[product_id, seller_id, buyer_id]).then((data)=>{
                console.log(data)
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
      });
}

module.exports.check = (product_id, seller_id, buyer_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one('select * from trade where product_id = $1 and seller_id = $2 and buyer_id = $3',[product_id, seller_id, buyer_id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
      });
}
