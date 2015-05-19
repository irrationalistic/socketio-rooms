var express = require('express');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

/*var server = app.listen(7850, function() {
	console.log('Express server listening on port ' + server.address().port);
});*/

var http = require('http').Server(app);
var io = require('socket.io')(http);

var server = http.listen(3000, function(){
	console.log('Express server listening on port ' + server.address().port);
});

io.on('connection', function(socket){
  console.log('connected');

  socket.on('joinRoom', function(roomName){
    socket.join(roomName);
  });
  
  socket.on('message', function(message){
    console.log(socket.rooms);
    socket.rooms.forEach(function(room){
      socket.to(room).emit('message', {
        room: room,
        message: message
      });
    });
  });
});
