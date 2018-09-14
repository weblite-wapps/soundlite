// module
const express = require("express")
const multer = require("multer")
const path = require("path")
const jsmediatags = require("jsmediatags")
const btoa = require("btoa")
const R = require("ramda")
const base64ToImage = require("base64-to-image")
const fs = require("fs")
const database = require("./database/database.js")

const filesPath = path.resolve(process.env.WEBLITE_WAPPS_DIR, "soundlite")
const imagesPath = path.resolve(filesPath, "images")
const audiosPath = path.resolve(filesPath, "audios")
const getAudiosPath = fileName => path.resolve(audiosPath, fileName)
const getImagePath = fileName => path.resolve(imagesPath, fileName)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, audiosPath),
  filename: (req, file, callback) =>
    callback(null, Date.now().toString() + path.extname(file.originalname)),
})
const upload = multer({ storage }).single("song")
const router = express.Router()

const imageToBase64 = req => {
  jsmediatags.read(getAudiosPath(req.file.filename), {
    onSuccess: ({ tags: { picture } }) => {
      if (picture) {
        const base64String = R.reduce(
          (a, b) => a + String.fromCharCode(b),
          "",
          picture.data,
        )
        const dataUrl = `data:${picture.format};base64, ${btoa(base64String)}`
        const startIndex = req.file.filename.lastIndexOf(".")
        const filename1 = req.file.filename.substring(0, startIndex)
        const optionalObj = { fileName: `${filename1}`, type: "png" }
        base64ToImage(dataUrl, `${imagesPath}/`, optionalObj)
      }
    },
    onError: error => console.log(":(", error.type, error.info),
  })
}
// save image
router.post("/uploadAudio", (req, res) =>
  upload(req, res, err => {
    if (err) console.log(err)
    else if (!req.file) return res.status(400).send("no files were uploaded")
    database
      .addAudio(req.body, `${req.file.filename}`)
      .then(() => res.send("submitted in database"))
      .catch(error => res.status(500).send(error))
    return imageToBase64(req, res)
  }),
)

router.get("/getAudios", (req, res) =>
  database
    .getAllAudios(req.query.wisId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ err, mymess: "no " })),
)

router.get("/downloadSoundsImg/:fileName", ({ params: { fileName } }, res) => {
  fs.access(getImagePath(fileName), err => {
    if (!err) {
      res.download(path.resolve(getImagePath(fileName)))
    } else {
      res.download(path.resolve(getImagePath(`NoTitle.png`)))
    }
  })
})

router.get(
  "/downloadSoundsTitles/:fileName",
  ({ params: { fileName } }, res) => {
    jsmediatags.read(getAudiosPath(fileName), {
      onSuccess: ({ tags: { title, artist } }) => {
        res.send({ title, artist })
      },
      onError: error => {
        console.log(":(", error.type, error.info)
        res.send({ title: null, artist: null })
      },
    })
  },
)

router.get("/downloadSound/:fileName", ({ params: { fileName } }, res) => {
  res.download(path.resolve(getAudiosPath(fileName)))
})

exports.Router = router
