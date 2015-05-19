var socket = io();

socket.on('message', function(data){
  console.log(data);
});

var sendMsg = function(ev, msg){
  socket.emit(ev, msg);
};

// sendMsg('joinRoom', 'roomname');
// sendMsg('message', 'message content');
