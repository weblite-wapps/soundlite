var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AudioSchema = new Schema({
  wisId: Number,
  addedBy: String,
  fileName: String,
  tags: [String]
})

exports.Audio = mongoose.model('audio', AudioSchema)
