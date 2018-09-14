const mongoose = require("mongoose")

const { Schema } = mongoose

const AudioSchema = new Schema({
  wisId: String,
  addedBy: String,
  fileName: String,
})

exports.Audio = mongoose.model("audio", AudioSchema)
