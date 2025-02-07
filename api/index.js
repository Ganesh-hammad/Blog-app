import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser'

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
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((error,req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || " Inrternal server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});