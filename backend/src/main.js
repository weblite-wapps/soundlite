const express = require('express')
const messagesRouter = require('./router/messagesRouter.js')
const database = require('./database/database.js')

const app = express()

database.connect('soundlite_db')

app.use('', messagesRouter.Router)

app.listen(3000, () => console.log("server running ..."))
