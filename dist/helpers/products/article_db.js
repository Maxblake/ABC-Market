const db = require('./../db');

module.exports.all = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any('select person.name, product.*, article.article_id from person inner join product on person.person_id = product.person_id inner join article on product.product_id = article.product_id').then(data=>{
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

module.exports.latest = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any('select distinct on (product.product_id) product.description as name, article.used as condition, product.product_id, article.price, image.url as image from product inner join article on product.product_id = article.product_id inner join image on product.product_id = image.product_id order by product.product_id desc').then(data=>{
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

module.exports.new = (product_id, stock, price, used, link, post_time)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.none('insert into article (product_id, stock, price, used, link, post_time) values ($1, $2, $3, $4, $5, $6)',[product_id, stock, price, used, link, post_time]).then(data=>{
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
              obj.none('delete from article where article_id = $1',[id]).then(data=>{
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