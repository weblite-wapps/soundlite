var express = require('express')
var messagesRouter = require('./router/messagesRouter.js')
var database = require('./database/database.js')

var app = express()

database.connect('soundlite_db')

app.use('', messagesRouter.Router)

app.listen(3000, () => console.log("server running ..."))
