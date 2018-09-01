const db = require('./../db');
const service = require('../queryfile').service

module.exports.latest = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any(service.latest).then(data=>{
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

module.exports.new = (user_id, title, description, type, category, location, post_time) => {
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(service.new, [user_id, title, description, type, category, location, post_time]).then(data=>{
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

module.exports.delete = id =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(service.delete, [id]).then(data=>{
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

module.exports.by_genre = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any(service.by_genre).then(data=>{
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
