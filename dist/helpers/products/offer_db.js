const db = require('./../db');

module.exports.all = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any('select person.name, product.*, offer.offer_id from person inner join product on person.person_id = product.person_id inner join offer on product.product_id = offer.product_id').then(data=>{
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
            obj.any('select distinct on (product.product_id) product.product_id, product.title,  product.description, offer.price , image.url as image from person inner join product on person.person_id = product.person_id inner join offer on product.product_id = offer.product_id inner join image on product.product_id = image.product_id order by product.product_id desc').then(data=>{
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

module.exports.new = (product_id, address, price)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none('insert into offer (product_id, address, price) values ($1, $2, $3)',[product_id, address, price]).then(data=>{
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