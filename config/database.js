import mongoose from "mongoose";

export default async function connectMongoDB() {
  try {
    let connect = await mongoose.connect(process.env.MONGODB);
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
}
