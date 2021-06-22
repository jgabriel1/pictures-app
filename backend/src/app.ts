import express, { Express } from 'express';
import 'express-async-errors';
import config from './config';
import { connectToDatabase } from './database/connection';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import { router } from './routes';

export class App {
  public constructor(
    private app: Express = express(),
    private port: number = config.port
  ) {}

  private async setup() {
    await connectToDatabase();

    this.app.use('/static', express.static(config.staticFolder));
    this.app.use(express.json());
    this.app.use(router);
    this.app.use(errorHandlingMiddleware);
  }

  public async run() {
    await this.setup();

    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`);
    });
  }
}
