var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var {Data} = require('./../models/data');

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost:27017/Records'

mongoose.connect(uristring , {useNewUrlParser: true});
var port = process.env.PORT || 3000;

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
      accRead1X:data.read1.x,
      accRead1Y:data.read1.y,
      accRead1Z:data.read1.z,
      read1TimeStamp:data.read1.timestamp,
      accRead2X:data.read2.x,
      accRead2Y:data.read2.y,
      accRead2Z:data.read2.z,
      read2TimeStamp:data.read2.timestamp,
      accRead3X:data.read3.x,
      accRead3Y:data.read3.y,
      accRead3Z:data.read3.z,
      read3TimeStamp:data.read3.timestamp,
      good:true
    });
    records.save().then((data) => console.log(data));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})

http.listen(port, function(){
  console.log('listening on *:3000');
});
