const db = require('./db');
module.exports.show = (id)=>{
    return new Promise((res,rej)=>{
          db.connect().then((obj)=>{
              obj.one('select * from trades where id = $1',[id]).then((data)=>{
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

// module.exports.new = (email, password, name, address)=>{
//     return new Promise((res,rej)=>{
//       let hashedPass = bcrypt.hashSync(password, 10)
//         db.connect().then((obj)=>{
//             obj.none('INSERT INTO users (email, password, name, address) VALUES ($1, $2, $3, $4)',[email, hashedPass, name, address]).then((data)=>{
//                 res(data);
//                 obj.done();
//             }).catch((error)=>{
//                 console.log(error);
//                 rej(error);
//                 obj.done();
//             });
//         }).catch((error)=>{
//             console.log(error);
//             rej(error);
//         });
//       });
// }
