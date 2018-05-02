const db = require('./db');
const bcrypt = require('bcryptjs');
module.exports.getUserByUsername = (username)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one('SELECT * FROM users where email = $1',[username]).then((data)=>{
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

module.exports.comparePassword = (candidatePassword, hash)=>{
    return new Promise((res,rej) => {
      bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.add_user = (email, password, name, address)=>{
    return new Promise((res,rej)=>{
      let hashedPass = bcrypt.hashSync(password, 10)
        db.connect().then((obj)=>{
            obj.none('INSERT INTO users (email, password, name, address) VALUES ($1, $2, $3, $4)',[email, hashedPass, name, address]).then((data)=>{
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
