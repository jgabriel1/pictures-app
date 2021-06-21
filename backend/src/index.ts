import 'reflect-metadata';

import express from 'express';
import { connectToDatabase } from './database/connection';
import { router } from './routes';

connectToDatabase();

const app = express();

app.use(express.json());
app.use(router);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
