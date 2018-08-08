const db = require('./db')

module.exports.show = (id)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one('select * from trades where id = $1',[id]).then((data)=>{
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

module.exports.new = (product_id, trade_id, buyer_id)=>{
    return new Promise((res,rej)=>{
      let hashedPass = bcrypt.hashSync(password, 10)
        db.connect().then((obj)=>{
            obj.none('INSERT INTO trade (product_id, trade_id, buyer_id) VALUES ($1, $2, $3)',[product_id, trade_id, buyer_id]).then((data)=>{
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
