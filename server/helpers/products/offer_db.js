const db = require('./../db');
const offer = require('../queryfile').offer

module.exports.latest = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any(offer.latest).then(data=>{
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

module.exports.new = (user_id, title, description, type, category, location, post_time, product_id, address, price)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one(offer.new, [user_id, title, description, type, category, location, post_time, product_id, address, price]).then(data=>{
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
            obj.none(offer.delete, [id]).then(data=>{
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

module.exports.by_genre = id =>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.any(offer.by_genre, [id]).then(data=>{
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

module.exports.search = (name, category) =>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.any(offer.search, [name, category]).then(data=>{
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