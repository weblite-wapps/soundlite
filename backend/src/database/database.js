const mongoose = require("mongoose")
const models = require("./databaseModel")

exports.connect = dbName => {
  mongoose.connect(`mongodb://localhost/${dbName}`)

  const db = mongoose.connection
  db.on("error", console.error.bind(console, "connection error:"))
  db.once("open", () => console.log(`Connected to ( ${dbName} ) database!`))
}

exports.addAudio = (audioInfo, fileName) =>
  new models.Audio({
    wisId: audioInfo.wisId,
    addedBy: audioInfo.addedBy,
    fileName,
  }).save()

exports.getAllAudios = wisId => models.Audio.find({ wisId })
