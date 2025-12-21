import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/server";

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

connectDB()
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  }).catch((error) => {
    console.log("MongoDB connection error", error)
    process.exit(1)
  })

export default app
