import mongoose from "mongoose";

export async function connectToMongo() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error(
        "MONGO_URI environment variable is not set. Check your .env file.",
      );
      process.exit(1);
    }
    const conn = await mongoose.connect(uri);
    console.log("connected to MongoDB:", conn.connection.host);
  } catch (error) {
    console.error("error connecting to mongodb:", error);
    process.exit(1);
  }
}
