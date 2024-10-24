import express from 'express'
import dotev from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import connectDB from './config/db.js'

// Load variable from .env file
dotev.config()
connectDB()

const app = express();

app.use(cors())
app.use(bodyParser.json())

// Routes

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}`)
})
