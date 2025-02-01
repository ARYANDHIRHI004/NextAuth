import mongoose, { connection } from "mongoose";

export const connect = async() => {
  try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI!}/nextAuth`)
        connection.on('connected', () => {
            console.log(`MongoDB connected successfully !! DB HOST: ${connectionInstance.connection.host}`);
        })        
  } catch (error) {
    console.log("DB connection failed")
  }
}
