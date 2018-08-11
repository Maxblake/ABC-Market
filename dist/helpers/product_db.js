const db = require('./db');

module.exports.new = (user_id, title, description, type, category, location)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one('insert into product (person_id, title, description, type, category, location) values ($1, $2, $3, $4, $5, $6) returning product_id', [user_id, title, description, type, category, location]).then(data=>{
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
        db.connect().then(obj => {
           obj.one("select array(select url from image where product_id=$1) as product_images", [id]).then(data=>{
                res(data);
                obj.done();
            }).catch(error=>{
                console.log(error)
                rej(error);
                obj.done();
            });
        }).catch(error=>{
            console.log(error)
            rej(error);
        });
    });
}

module.exports.add_image = (product_id, url)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none('insert into image (product_id, url) values ($1, $2)', [product_id, url]).then(data=>{
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

module.exports.show = (category, id) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one(`select person.name, product.*, ${category}.* from person inner join product on person.person_id = product.person_id inner join ${category} on product.product_id = ${category}.product_id where product.product_id = $1`, [id]).then(data=>{
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
