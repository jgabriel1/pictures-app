import path from 'path';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

export const connectToDatabase = async () => {
  let connectionOptions: ConnectionOptions;

  if (process.env.NODE_ENV === 'PROD') {
    connectionOptions = await getConnectionOptions();
  } else {
    connectionOptions = {
      type: 'sqlite',
      name: 'default',
      database: './database.sqlite',
      logging: true,
      entities: [path.resolve(__dirname, '..', 'models', '{*.ts,*.js}')],
      synchronize: true,
    };
  }

  let retries = 10;

  while (retries) {
    try {
      await createConnection(connectionOptions);

      console.log('CONNECTED TO DATABASE.');

      break;
    } catch (error) {
      console.log(error);
      console.log('THERE WAS AN ERROR CONNECTING, RETRYING IN 5 SECONDS.');

      retries -= 1;

      await new Promise(resolve => {
        setTimeout(resolve, 5000);
      });
    }
  }
};
