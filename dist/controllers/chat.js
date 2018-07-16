const io = require("socket.io");
const history = require("../helpers/chat_db")

module.exports = io => {
  // Chatroom
  var numUsers = 0;
  
  io.on('connection', (socket) => {
    let room_number = socket.handshake.query['trade']
    let user_id = null
    socket.on('joinroom', (room_number) => {
      socket.join(room_number);
      })

    socket.on('login', data => {
      user_id = (data != undefined) ? data.id : null
    })
    var addedUser = false;
    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
      const date = new Date()
      const time = date.toDateString() + " " + date.toLocaleTimeString()
      // we tell the client to execute 'new message'
      history.new(room_number, user_id, data, time).then(success => {
        io.to(room_number).emit('new message', { message: data, user_id });
      }).catch(err => {
        console.log(err)
      })
    });




    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
      if (addedUser) return;

      // we store the username in the socket session for this client
      socket.username = username;
      ++numUsers;
      addedUser = true;
      socket.emit('login', {
        numUsers: numUsers
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing',  ()  =>{
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', ()  =>{
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', ()  =>{
      if (addedUser) {
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });
}
