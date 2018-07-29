// module
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const https = require('https')
// router and db
const messagesRouter = require('./router.js')
const database = require('./database/database.js')


const app = express()
database.connect('soundlite_db')
app.use(cors({ origin: '*' }))
app.use(messagesRouter.Router)

const key = fs.readFileSync(path.resolve('./certs/express.key'), 'utf8')
const cert = fs.readFileSync(path.resolve('./certs/express.crt'), 'utf8')


https
  .createServer({ key, cert }, app)
  .listen(3093)
