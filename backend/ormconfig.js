const path = require('path');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'my_pictures',
  entities: [path.resolve(__dirname, 'src', 'models', '{*.ts,*.js}')],
  synchronize: true,
};
