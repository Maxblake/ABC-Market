const db = require('./../db');
const place = require('../queryfile').place

module.exports.latest = () =>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any(place.latest).then(data=>{
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

module.exports.new = (user_id, title, description, type, category, location, post_time, specification, schedule, address, link)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.one(place.new, [user_id, title, description, type, category, location, post_time, specification, schedule, address, link]).then(data=>{
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

module.exports.delete = id => {
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(place.detele, [id]).then(data=>{
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