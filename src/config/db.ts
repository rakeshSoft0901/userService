import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const mongoUri = `${process.env.MONGO_URL}${process.env.MONGO_DB}`
  if (!mongoUri) {
    throw new Error("Please provide MONGO_URL and MONGO_DB in the environment variables")
  }
  await mongoose.connect(mongoUri)
}
