const db = require('./../db');
const vehicle = require('../queryfile').vehicle

module.exports.all = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any(vehicle.all).then(data=>{
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

module.exports.new = (user_id, title, description, type, category, location, post_time, brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner,  windows, pilot_seat, air_cond)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one(vehicle.new, [user_id, title, description, type, category, location, post_time, brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, windows, pilot_seat, air_cond]).then(data=>{
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
            obj.none(vehicle.delete,[id]).then(data=>{
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

module.exports.edit = (brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, windows, pilot_seat, air_cond, vehicle_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none('update vehicle set brand = $1, model = $2, distance = $3, year = $4, fuel = $5, negotiable = $6, finance = $7, int_material = $8, unique_owner = $9, windows = $10, pilot_seat = $11, air_cond = $12 where vehicle_id = $13',
                [brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, windows, pilot_seat, air_cond, vehicle_id]).then(data=>{
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

module.exports.search = name =>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.any(vehicle.search, [name]).then(data=>{
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