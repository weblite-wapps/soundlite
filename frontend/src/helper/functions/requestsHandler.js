// module
import request from "superagent"
// config
import config from "../../config"

export default {
  getData: wisId =>
    request
      .get(config.server + "/getAudios")
      .set("Access-Control-Allow-Origin", "*")
      .query({ wisId })
      .then(res => res.body),

  getAudiosArtistAndTitle: fileName =>
    request
      .get(config.server + "/downloadSoundsTitles/" + fileName)
      .set("Access-Control-Allow-Origin", "*")
      .then(res => res.body)
      .catch(),

  uploadAudio: formData =>
    request
      .post(config.server + "/uploadAudio")
      .set("Access-Control-Allow-Origin", "*")
      .send(formData)
      .then(res => res.body),
}
