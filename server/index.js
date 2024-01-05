import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import petListingRouter from './routes/petListingRoute.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/server/user', userRouter);
app.use('/server/auth', authRouter);
app.use('/server/listing', petListingRouter);

// connect to DB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno en el servidor';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
