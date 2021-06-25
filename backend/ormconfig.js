const path = require('path');

module.exports = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'my_pictures',
  entities: [
    process.env.NODE_ENV === 'PROD'
      ? path.resolve(__dirname, 'dist', 'models', '{*.ts,*.js}')
      : path.resolve(__dirname, 'src', 'models', '{*.ts,*.js}'),
  ],
  synchronize: true,
};
