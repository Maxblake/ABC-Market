const db = require('./../db');
const article = require('../queryfile').article

module.exports.latest = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any(article.latest).then(data=>{
                res(data);
                obj.done();
            }).catch(error=>{
                console.log(error)
                rej(error);
                obj.done();
            })
        }).catch(error=>{
            console.log(error)
            rej(error);
        });
    });
}

module.exports.new = (user_id, title, description, type, category, location, post_time, stock, price, used, link)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.one(article.new, [user_id, title, description, type, category, location, post_time, stock, price, used, link]).then(data=>{
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

module.exports.delete = id =>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.none(article.delete, [id]).then(data=>{
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