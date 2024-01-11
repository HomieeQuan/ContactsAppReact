const express = require('express')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()
const port = process.env.PORT
const bodyParser = require('body-parser')
const connectDb = require('./config/connectDb')
const contactRoutes = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes')

connectDb()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}


app.use(express.json())
app.use(cors())
app.use('/api/contacts',contactRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)

// app.use('/api', router)
app.listen(port, console.log(`Port is running on:${port}`))