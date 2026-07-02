import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import data from './data.ts';
import chequesRouter from './controllers/cheques.ts';
import dotenv from 'dotenv'

const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { family: 4 })
        .then(() => {
          console.log("Connected to MongoDB")
        }).catch(() => {
          console.log("Error: Failed to connect to mongoose")
        })
} else { 
  console.log("Error: Mongoose URI not found")
}

app.use('/api/cheques', chequesRouter)

app.get('/customers', (_req, res) => {
  res.json(data.custData)
})

app.get('/customer:id', (_req, res) => {
  res.json("Specific customer")
})


app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
