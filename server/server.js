var app = require('express')();
var express = require('express');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var {Data} = require('./../models/data');
var port = process.env.PORT;


var connection = mongoose.createConnection(process.env.MONGODB_URL, {useNewUrlParser: true}); //
autoIncrement.initialize(connection);


var dataSchema = new Schema({
  accX: {type: Number, required: true, minlength: 1},
  accY: {type: Number, required: true, minlength: 1},
  accZ: {type: Number, required: true, minlength: 1},
  gyroGamma: {type: Number, minlength: 1},
  gyroAlpha: {type: Number, minlength: 1},
  gyroBeta: {type: Number,  minlength: 1},
  timeStamp1: {type:Number, minlength: 1},
  quality:{type:Boolean, required:true }
});

dataSchema.plugin(autoIncrement.plugin, 'Data');
var Data = connection.model('Data', dataSchema);

app.use(express.static('public'))
app.get('/', function(req, res){

});

io.on('connection', (socket) => {
  console.log('New WebSocket Connection');

  socket.emit('counterUpdated', () => {
    console.log('Hello there');
  });

  socket.on('GettingData', (data) => {

    var acc = data[0].John;
    var gyro = data[1].henry;

    var records = new Data({
      accX:acc.x,
      accY:acc.y,
      accZ:acc.z,
      gyroGamma:gyro.gamma,
      gyroAlpha:gyro.alpha,
      gyroBeta:gyro.beta,
      timeStamp1:acc.timestamp,
      quality:acc.quality
    });
    records.save().then((data) => console.log(data));
  });

  socket.on('disconnect', () => {
  });
})

http.listen(port, function(){
  console.log('listening on *:'+ port);
});
