const express = require('express')
const bodyParser = require('body-parser')
const database = require('./../database/database.js')
const multer = require('multer')
const path = require('path')
const jsmediatags = require("jsmediatags")
const btoa = require('btoa')
const R = require('ramda')

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, './public/audios')},
  filename: (req, file, callback) => callback(null, Date.now().toString() + path.extname(file.originalname))
})

const upload = multer({storage}).single('song')
const router = express.Router()

router.use('./static', express.static('./public/audios'))
router.use(bodyParser.json())
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Origin')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

router.post('/uploadAudio' , (req, res) => {
  upload(req, res, (err) => {
    if(err){res.send(err)}
    else{
      if(!req.file) { return res.status(400).send('no files were uloaded')}
      database.addAudio(req.body, `${req.file.filename}`)
        .then(() => res.send('submitted in database'))
        .catch(err => res.status(500).send(err))
    }
  })
})

router.get('/getAudios', (req, res) => database
  .getAllAudios(req.query.wisId)
  .then(data => res.send(data))
  .catch(err => res.status(500).send({err: err, mymess: "no "}))
)

router.get('/downloadSoundsImg/:fileName', (req, res) => {
  jsmediatags.read(`./public/audios/${req.params.fileName}`, {
    onSuccess: function(tag) {
      var dataUrl = ""
      if(tag.tags.picture){
        const base64String = R.reduce((a, b) => a + String.fromCharCode(b), "", tag.tags.picture.data)
        dataUrl = "data:" + tag.tags.picture.format + ";base64," + btoa(base64String);
      }
      res.send({src: dataUrl, title: tag.tags.title, artist: tag.tags.artist})
    },
    onError: function(error) {
      console.log(':(', error.type, error.info);
    }
  });
})


router.get('/downloadSound/:fileName', (req, res) => { res.download(`${__dirname} /../../public/audios/${req.params.fileName}`)})


exports.Router = router
