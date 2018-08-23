const db = require('./db');
const product = require('./queryfile').product

module.exports.images = id => {
    return new Promise((res,rej)=>{
        db.connect().then(obj => {
           obj.one(product.images, [id]).then(data=>{
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
            obj.none(product.add_images, [product_id, url]).then(data=>{
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
            obj.one(product.type, [id]).then(data=>{
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
            obj.one((category == 'article') ? product.show_article : (category == 'offer') ? product.show_offer : (category == 'place') ? product.show_place : (category == 'service') ? product.show_service :  product.show_vehicle, [id]).then(data=>{
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
