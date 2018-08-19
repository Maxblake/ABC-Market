const db = require('./db');

module.exports.new = (user_id, title, description, type, category, location, post_time)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one('insert into product (person_id, title, description, type, category, location, post_time) values ($1, $2, $3, $4, $5, $6, $7) returning product_id', [user_id, title, description, type, category, location, post_time]).then(data=>{
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

module.exports.type = (id) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one('select type as kind from product where product_id = $1', [id]).then(data=>{
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

module.exports.show = (category, id) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one(`select product.*, ${category}.* from person inner join product on person.person_id = product.person_id inner join ${category} on product.product_id = ${category}.product_id where product.product_id = $1`, [id]).then(data=>{
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

module.exports.user_uploads = (seller_id) =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any(`select distinct on (product.product_id) product.title, product.type, image.url as image from product inner join trade on product.product_id = trade.product_id inner join image on trade.product_id = image.product_id where trade.seller_id = $1`, [seller_id]).then(data=>{
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
