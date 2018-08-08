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

module.exports.show = (id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one('select * from place where place_id = $1',[id]).then(data=>{
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


module.exports.new = (product_id, specification, schedule, address, post_time, link, location)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none('insert into place (product_id, specification, schedule, address, post_time, link, location) values ($1, $2, $3, $4, $5, $6, $7)',[product_id, specification, schedule, address, post_time, link, location]).then(data=>{
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
            obj.none('delete from place where place_id = $1',[id]).then(data=>{
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