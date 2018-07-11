const db = require('./../db');

module.exports.all = ()=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.any('select * from service').then(data=>{
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
              obj.one('select * from service where service_id = $1',[id]).then(data=>{
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


module.exports.new = (product_id, post_time)=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.none('insert into service (product_id, post_time) values ($1, $2)',[product_id, post_time]).then(data=>{
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

module.exports.edit = ()=>{
    return new Promise((res,rej)=>{
          db.connect().then(obj=>{
              obj.none('update service').then(data=>{
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