import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { connectToDatabase } from './database/connection';
import { router } from './routes';
import config from './config';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';

connectToDatabase();

const app = express();

app.use('/static', express.static(config.staticFolder));
app.use(express.json());
app.use(router);
app.use(errorHandlingMiddleware);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
