var io = require("socket.io");

module.exports = function(io) {
  // Chatroom
  var numUsers = 0;
  var room_number = 0;

  console.log(io.nsps['/'].adapter.rooms)
  io.on('connection', function (socket) {
    console.log(socket.adapter.rooms[room_number])
    if (socket.adapter.rooms[room_number] === undefined) {
      socket.on('joinroom', (room_number) => {
        socket.join(room_number);
        console.log(socket.adapter.rooms[room_number].length)
      })
    } else if (socket.adapter.rooms[room_number].length <= 2) {
       room_number = room_number + 1
      socket.on('joinroom', (room_number) => {
        socket.join(room_number);
        console.log(socket.id)
      })
    }
    var addedUser = false;
    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
      // we tell the client to execute 'new message'
      console.log(io.nsps['/'].adapter.rooms[1].length)
      console.log(socket.id);
      io.sockets.emit('new message', { message: data , id: socket.id});
    });















    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
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
    socket.on('typing', function () {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
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
