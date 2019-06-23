$(() => {
  const socket = io.connect('http://localhost:3000');

  console.log('lol');
  
  socket.emit('init-user');
  socket.on('init-user', (data) => {
    console.log(data);
    $('#user-name').text(`#${data.user}:`);    
    data.history.forEach(el => {
      $('#chat-history').append(`<div><span class="name">#${el.user}:</span><span>${el.text}</span></div>`);
    });
  });

  const enterKey = 13;
  $('#chat-input-msg').keypress(function (e) {
    if(e.which == enterKey) {
       const text = $('#chat-input-msg').val().trim();
       if (text) {
        socket.emit('chat-message', text);
       } 

       $('#chat-input-msg').val('');
     }
   });

   socket.on('chat-message', (data) => {
    $('#chat-history').append(`<div><span class="name">#${data.user}:</span><span>${data.text}</span></div>`);
   });
});