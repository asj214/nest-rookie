import * as dotenv from 'dotenv'
import { DataSource } from "typeorm";

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  synchronize: false,
  entities: [
    'dist/**/*.entity{.ts,.js}'
  ],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations'
});

export default AppDataSource;