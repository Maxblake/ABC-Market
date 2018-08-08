const db = require('./../db');

module.exports.all = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any('select person.name, product.*, vehicle.vehicle_id from person inner join product on person.person_id = product.person_id inner join vehicle on product.product_id = vehicle.product_id').then(data=>{
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
            obj.one('select * from vehicle where vehicle_id = $1',[id]).then(data=>{
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

module.exports.new = (product_id, brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, post_time, origin,  windows, pilot_seat, air_cond)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none('insert into vehicle (product_id, brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, post_time, location, windows, pilot_seat, air_cond) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',[product_id, brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, post_time, origin, windows, pilot_seat, air_cond]).then(data=>{
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
            obj.none('delete from vehicle where vehicle_id = $1',[id]).then(data=>{
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

module.exports.edit = (brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, post_time, location, windows, pilot_seat, air_cond, vehicle_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none('update vehicle set brand = $1, model = $2, distance = $3, year = $4, fuel = $5, negotiable = $6, finance = $7, int_material = $8, unique_owner = $9, post_time = $10, location = $11, windows = $12, pilot_seat = $13, air_cond = $14 where vehicle_id = $15',
                [brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, post_time, location, windows, pilot_seat, air_cond, vehicle_id]).then(data=>{
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