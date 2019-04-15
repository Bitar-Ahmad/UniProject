var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var {Data} = require('./../models/data');


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}); //'mongodb://localhost:27017/Records'
var port = process.env.PORT;

app.use(express.static('public'))
app.get('/', function(req, res){

});

io.on('connection', (socket) => {
  console.log('New WebSocket Connection');

  socket.emit('counterUpdated', () => {
    console.log('Hello there');
  });

  socket.on('GettingData', (data) => {
    var records = new Data({
      accX:data.x,
      accY:data.y,
      accZ:data.z,
      gyroGamma:data.gamma,
      gyroAlpha:data.alpha,
      gyroBeta:data.beta,
      timeStamp1:data.timestamp,
      quality:data.quality
    });
    records.save().then((data) => console.log(data));
  });

  socket.on('disconnect', () => {
  });
})

http.listen(port, function(){
  console.log('listening on *:'+ port);
});
