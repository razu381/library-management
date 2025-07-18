import mongoose from "mongoose";
import { Server } from "http";
import "dotenv/config";
import app from "./app";

let server: Server;
const port = 3000;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ve9ya7v.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("✅ Connected to MongoDB using Mongoose");

    server = app.listen(port, () => {
      console.log(`🚀 Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

main();
