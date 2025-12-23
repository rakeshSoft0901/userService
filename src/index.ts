import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"
import { connectDB } from "./config/db";
import routes from "./routes/index.route";


const app = express()
app.use(express.json())
app.use("/api", routes);

// handle global route error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 3000

connectDB()
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  }).catch((error) => {
    console.log("MongoDB connection error: ", error)
    process.exit(1)
  })

export default app
