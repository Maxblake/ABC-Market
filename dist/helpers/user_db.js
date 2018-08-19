const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.getUserByUsername = (username)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one('SELECT * FROM person where username = $1',[username]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.id = (id)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one('SELECT * FROM person where person_id = $1',[id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}

module.exports.comparePassword = (candidatePassword, hash)=>{
    return new Promise((res,rej) => {
      bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.new = (name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address)=>{
    return new Promise((res,rej)=>{
      let hashedPass = bcrypt.hashSync(password, 10)
        db.connect().then((obj)=>{
            obj.any('INSERT INTO person (name, lastname, code, phonenumber, username, password, gender, type, birthDate, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning username, password',[name, lastname, code, phoneNumber, username, hashedPass, gender, type, birthDate, address]).then((data)=>{
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

module.exports.contacts_details = (id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.any(`select product.title, product.type, person.name, person.code, person.phonenumber, person.profile_img, trade.trade_id from product inner join trade on trade.product_id = product.product_id inner join person on trade.buyer_id = person.person_id or trade.seller_id = person.person_id where person.person_id = $1`,[id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            rej(error);
        });
    });
}
