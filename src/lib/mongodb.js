import mongoose from "mongoose";

export const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "drobiza-shop",
    });
    console.log("connected to mongodb");
  } catch (err) {
    console.log("Error connecting to mongodb:", err);
  }
};
