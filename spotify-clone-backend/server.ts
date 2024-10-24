import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute'
import albumRouter from './src/routes/albumRoute'
import connectDB from './src/config/mongodb'
import connectCloudinary from './src/config/cloudinary'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//initializing routes
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)

app.get('/', (req,res) => res.send("API Working"))

app.listen(port, () => console.log(`Server started on ${port}`))