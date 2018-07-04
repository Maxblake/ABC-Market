const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.getUserByUsername = (username)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one('SELECT * FROM users where email = $1',[username]).then((data)=>{
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
      bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.new = (name, lastname, code, phoneNumber, username, password, gender, type, birthDate, address)=>{
    return new Promise((res,rej)=>{
      let hashedPass = bcrypt.hashSync(password, 10)
        db.connect().then((obj)=>{
            obj.none('INSERT INTO users (name, lastname, code, phonenumber, username, password, gender, type, birthDate, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',[name, lastname, code, phoneNumber, username, hashedPass, gender, type, birthDate, address]).then((data)=>{
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
