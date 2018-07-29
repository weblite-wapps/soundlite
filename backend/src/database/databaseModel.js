var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AudioSchema = new Schema({
  wisId: String,
  addedBy: String,
  fileName: String,
})

exports.Audio = mongoose.model('audio', AudioSchema)
