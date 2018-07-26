import request from 'superagent'


const domain = 'http://localhost:3000/'


export default {
  getData: wisId => request
    .get(domain + 'getAudios/')
    .query({ wisId })
    .then(res => res.body)
    .catch(console.log),

  getAudiosImg: fileName => request
    .get(domain + 'downloadSoundsImg/' + fileName)
    .then(res => res.body)
    .catch(console.log),

  uploadAudio: formData => request
    .post(domain + '/uploadAudio')
    .send(formData)
    .then(res => res.body)
    .catch(console.log)
}
