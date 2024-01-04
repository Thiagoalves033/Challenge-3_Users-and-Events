import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';

import express, { Express } from 'express';
import ErrorHandler from './infrastructure/express/middlewares/ErrorHandler.middleware';
import userRouter from './infrastructure/express/routes/user.route';
import eventRouter from './infrastructure/express/routes/event.route';

import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './swagger.json';

const app: Express = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);
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
