import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express, { Express } from 'express';
import ErrorHandler from './infrastructure/middlewares/ErrorHandler.middleware';
import userRouter from './infrastructure/routes/user.route';
import eventRouter from './infrastructure/routes/event.route';

const app: Express = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use(ErrorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
