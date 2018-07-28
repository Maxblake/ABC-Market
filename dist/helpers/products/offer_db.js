const db = require('./../db');

module.exports.all = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any('select person.name, product.*, offer.offer_id from person inner join product on person.person_id = product.user_id inner join offer on product.product_id = offer.product_id').then(data=>{
                res(data);
                obj.done();
            }).catch(error=>{
                rej(error);
                obj.done();
            })
        }).catch(error=>{
            rej(error);
        });
    });
}

module.exports.show = (id)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.one('select * from offer where offer_id = $1',[id]).then(data=>{
                  res(data);
                  obj.done();
              }).catch(error=>{
                  rej(error);
                  obj.done();
              });
          }).catch(error=>{
              rej(error);
        });
    });
}


module.exports.new = (product_id, start, finish, address)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.none('insert into offer (product_id, start, finish, address) values ($1, $2, $3, $4)',[product_id, start, finish, address]).then(data=>{
                  res(data);
                  obj.done();
              }).catch(error=>{
                  rej(error);
                  obj.done();
              });
          }).catch(error=>{
              rej(error);
        });
    });
}

module.exports.delete = (id)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.none('delete from offer where offer_id = $1',[id]).then(data=>{
                  res(data);
                  obj.done();
              }).catch(error=>{
                  rej(error);
                  obj.done();
              });
          }).catch(error=>{
              rej(error);
        });
    });
}