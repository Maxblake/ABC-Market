const db = require('./db');

module.exports.all = ()=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.any('select * from products').then(data=>{
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

module.exports.new = (user_id, title, description, category)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.one('insert into product (user_id, title, description, category) values ($1, $2, $3, $4) returning product_id', [user_id, title, description, category]).then(data=>{
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

module.exports.images = (id)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.any('select images.url from products inner join images on products .id = images.product_id where products.id = $1', [id]).then(data=>{
                  res(data);
                  obj.done();
              }).catch(error=>{
                  console.log(error)
                  rej(error);
                  obj.done();
              });
          }).catch(error=>{
              rej(error);
        });
    });
}

module.exports.add_image = (product_id, url)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.none('insert into images (product_id, url) values ($1, $2)', [product_id, url]).then(data=>{
                  res(data);
                  obj.done();
              }).catch(error=>{
                  console.log(error)
                  rej(error);
                  obj.done();
              });
          }).catch(error=>{
              rej(error);
        });
    });
}