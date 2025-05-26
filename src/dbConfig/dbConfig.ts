import mongoose from "mongoose";
export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    const connection = mongoose.connection;
    connection.on("connected", () => {
        console.log("Connected to MongoDB");
    })
    connection.on('error',(error)=>{
        console.error("Error connecting to MongoDB:", error);
    })
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};