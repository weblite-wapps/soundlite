var mongoose = require('mongoose')
var models =require('./databaseModel')


exports.connect = function (dbName) {
  mongoose.connect('mongodb://localhost/' + dbName)

  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to (' + dbName + ') database!')
  })
}

exports.addAudio = function(audioInfo, fileName) {
   return  new models.Audio({wisId: audioInfo.wisId, addedBy: audioInfo.addedBy, fileName: fileName, tags: audioInfo.tags}).save()
 }

exports.getAllAudios = function(wisId) {
  return models.Audio.find({wisId}).exec()
}
