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
            obj.any('select distinct on (product.product_id) product.title, product.product_id, product.description, place.specification, image.url as image, place.schedule from person inner join product on person.person_id = product.person_id inner join place on product.product_id = place.product_id inner join image on place.product_id = image.product_id order by product.product_id desc').then(data=>{
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

module.exports.new = (product_id, specification, schedule, address, link)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none('insert into place (product_id, specification, schedule, address, link) values ($1, $2, $3, $4, $5)',[product_id, specification, schedule, address, link]).then(data=>{
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