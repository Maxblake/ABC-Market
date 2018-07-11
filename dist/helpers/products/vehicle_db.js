const db = require('./../db');

module.exports.all = () =>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.any('select * from vehicle').then(data=>{
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


module.exports.new = (product_id, brand, model, fuel, negotiable, finance, int_material, unique_owner, post_time, origin,  windows, pilot_seat, air_cond)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.none('insert into vehicle (product_id, brand, model, fuel, negotiable, finance, int_material, unique_owner, post_time, origin,  windows, pilot_seat, air_cond) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',[product_id, brand, model, fuel, negotiable, finance, int_material, unique_owner, post_time, origin,  windows, pilot_seat, air_cond]).then(data=>{
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