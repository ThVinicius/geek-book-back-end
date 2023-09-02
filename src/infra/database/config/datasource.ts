import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'geekbook',
  entities: [__dirname + '/src/infra/**/*.entity{.ts,.js}'], //'/../../../**/*.entity{.ts,.js}'
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
