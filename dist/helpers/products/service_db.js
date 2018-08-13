const db = require('./../db');

module.exports.latest = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any('select person.name, product.product_id, product.title, product.description, person.profile_img as image from person inner join product on person.person_id = product.person_id inner join service on product.product_id = service.product_id order by product.product_id desc').then(data=>{
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

module.exports.new = (product_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none('insert into service (product_id) values ($1)',[product_id]).then(data=>{
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
            obj.none('delete from service where service_id = $1',[id]).then(data=>{
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