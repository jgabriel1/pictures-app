import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { connectToDatabase } from './database/connection';
import { router } from './routes';
import { AppError } from './errors/AppError';

connectToDatabase();

const app = express();

app.use(express.json());
app.use(router);

app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): Response => {
    if (error instanceof AppError)
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });

    return res.status(500).json({
      status: 'error',
      message: `Internal server error ${error.message}`,
    });
  }
);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
