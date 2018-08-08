const db = require('./db')

module.exports.show = (trade_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any('SELECT sender_id as id, message as msg, time FROM chat_hist WHERE trade_id = $1 ORDER BY time LIMIT 15',[trade_id]).then((data)=>{
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

module.exports.new = (trade_id, sender_id, message, time)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO chat_hist (trade_id, sender_id, message, time) VALUES ($1, $2, $3, $4)',[trade_id, sender_id, message, time]).then((data)=>{
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

