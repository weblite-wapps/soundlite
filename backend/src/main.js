// module
const express = require("express")
const cors = require("cors")
// router and db
const messagesRouter = require("./router.js")
const database = require("./database/database.js")

const app = express()
database.connect("soundlite_db")
app.use(cors({ origin: "*" }))
app.use(messagesRouter.Router)


app.listen(4140, () => console.log('Server Running!'))
