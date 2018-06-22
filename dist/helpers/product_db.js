const db = require('./db');

module.exports.add_product = (user_id, stock, price, description, name, img1, img2, img3, img4, img5)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('insert into products (user_id, stock, price, description, name, img1, img2, img3, img4, img5) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [user_id, stock, price, description, name, img1, img2, img3, img4, img5]).then((data)=>{
                res(200);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(500);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(500);
        });
    });
}

module.exports.show_all_products = () => {
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('SELECT * FROM products').then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}

module.exports.show_product = (id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.one('SELECT * FROM products where id = $1',[id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}

module.exports.delete_product = (id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.none('DELETE FROM products where id = $1',[id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}

module.exports.update_product = (price, description, stock, type_supplier, brand, department, code, id) =>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.result('UPDATE products SET price = $1, description = $2, stock = $3, type_supplier = $4, brand = $5, department = $6, code = $7 WHERE id = $8',[price, description, stock, type_supplier, brand, department, code, id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}
