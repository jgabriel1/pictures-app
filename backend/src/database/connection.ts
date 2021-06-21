import path from 'path';
import { createConnection } from 'typeorm';

export const connectToDatabase = async () => {
  await createConnection({
    type: 'sqlite',
    name: 'default',
    database: './database.sqlite',
    logging: true,
    entities: [path.resolve(__dirname, '..', 'models', '*.ts')],
    synchronize: true,
  });
};
