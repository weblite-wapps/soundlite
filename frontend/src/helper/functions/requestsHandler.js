import request from 'superagent'

const domain = 'http://localhost:3000/'

export default{
  getData: (wisId) => request
    .get(domain + 'getAudios/')
    .query({ wisId })
    .then(res => res.body)
    .catch(err => console.log(err)),
}
