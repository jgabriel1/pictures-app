import path from 'path';
import { createConnection } from 'typeorm';

export const connectToDatabase = async () => {
  let retries = 5;

  while (retries) {
    try {
      await createConnection({
        type: 'sqlite',
        name: 'default',
        database: './database.sqlite',
        logging: true,
        entities: [path.resolve(__dirname, '..', 'models', '*.ts')],
        synchronize: true,
      });

      console.log('CONNECTED TO DATABASE.');

      break;
    } catch (error) {
      console.log('THERE WAS AN ERROR CONNECTING, RETRYING IN 5 SECONDS.');

      retries -= 1;

      await new Promise(resolve => {
        setTimeout(resolve, 5000);
      });
    }
  }
};
