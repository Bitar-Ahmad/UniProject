var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  accRead1X: {type: Number, required: true, minlength: 1},
  accRead1Y: {type: Number, required: true, minlength: 1},
  accRead1Z: {type: Number, required: true, minlength: 1},
  read1TimeStamp: {type:Number, required:true, minlength: 1},
  accRead2X: {type: Number, required: true, minlength: 1},
  accRead2Y: {type: Number, required: true, minlength: 1},
  accRead2Z: {type: Number, required: true, minlength: 1},
  read2TimeStamp: {type:Number, required:true, minlength: 1},
  accRead3X: {type: Number, required: true, minlength: 1},
  accRead3Y: {type: Number, required: true, minlength: 1},
  accRead3Z: {type: Number, required: true, minlength: 1},
  read3TimeStamp: {type:Number, required:true, minlength: 1},
  good:{type:Boolean, required:true },
});

var Data = mongoose.model('Data', dataSchema);

module.exports = {Data};
