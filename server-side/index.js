const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./app/router/index')
const PORT = 1000

app.use(bodyParser.json())
app.use(cors())
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Listen on ${PORT}`)
})