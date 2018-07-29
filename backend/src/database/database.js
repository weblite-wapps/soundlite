var mongoose = require('mongoose')
var models =require('./databaseModel')


exports.connect = dbName => {
  mongoose.connect('mongodb://localhost/' + dbName)

  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to (' + dbName + ') database!')
  })
}

exports.addAudio = (audioInfo, fileName) => new models
  .Audio({
    wisId: audioInfo.wisId,
    addedBy: audioInfo.addedBy,
    fileName,
  }).save()

exports.getAllAudios = wisId => models.Audio.find({ wisId })
