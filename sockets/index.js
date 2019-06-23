
const history = [];

const indexWebSocket = (io) => {
  io.on('connection', function (socket) {
    let user = Math.floor(Math.random() * 900000000 + 1000000);    
    console.log(`User #${user} connected.`);
    
    socket.on('init-user', () => {
      console.log('init-user: ', user);
      socket.emit('init-user', {user, history});
    });

    socket.on('chat-message', (text) => {
      console.log(`chat-message-> #${user}: ${text}`);
      history.push({user, text});
      io.emit('chat-message', {user, text});
    });

    socket.on('disconnect', function(){
      console.log(`user #${user} disconnected`);
    });
  });
}

module.exports = indexWebSocket;
