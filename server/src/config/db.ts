import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const uri = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/blue-dog-api";
console.log("[db] MONGODB_URL set:", !!process.env.MONGODB_URL);
console.log("[db] Connecting to:", uri.replace(/:\/\/[^@]+@/, "://<credentials>@"));

mongoose.connect(uri);

const db = mongoose.connection;

export default db;
