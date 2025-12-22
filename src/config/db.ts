import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const mongoUri = `${process.env.MONGO_URL}${process.env.DATABASE_NAME}`
  if (!process.env.MONGO_URL || !process.env.DATABASE_NAME) {
    throw new Error("Please provide MONGO_DB URL and DB_NAME in the environment variables")
  }
  await mongoose.connect(mongoUri)
}
