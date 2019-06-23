
let history = [];

const indexWebSocket = (io) => {
  io.on('connection', function (socket) {
    const user = Math.floor(Math.random() * 900000000 + 1000000).toString(36);
    const color = Math.floor(Math.random() * 16777215).toString(16);

    console.log(`User #${user} connected.`);
    
    socket.on('init-user', () => {
      console.log('init-user: ', user);
      socket.emit('init-user', {user, color, history});
    });

    socket.on('chat-message', (text) => {
      console.log(`chat-message-> #${user}: ${text}`);
      history.push({user, color, text});
      history = history.slice(-50);
      io.emit('chat-message', {user, color, text});
    });

    socket.on('disconnect', function(){
      console.log(`user #${user} disconnected`);
    });
  });
}

module.exports = indexWebSocket;
