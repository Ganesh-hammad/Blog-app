import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
