import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config();
const app = express();

// routes
app.use('/server/user', userRouter);

// connect to DB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
