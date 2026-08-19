import mongoose from "mongoose";

let connected = false;

export default async function connectDB() {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("Mongodb connected");
    return;
  }

  try {
    mongoose.connect(process.env.MONGO_DB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
}
