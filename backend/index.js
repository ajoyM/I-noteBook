const connectToDB = require('./db');
const express = require('express')
var cors = require('cors')
const dotenv = require("dotenv").config();

connectToDB()

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

app.use('/api/auth', require('./routers/auth'))
app.use('/api/note', require('./routers/notes'))

app.listen(port, () => {
    console.log(`Opening port is http://localhost:${port}`)
})