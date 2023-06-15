import * as dotenv from 'dotenv'
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

dotenv.config();

const typeORMConfig: TypeOrmModuleOptions = {
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
  migrationsTableName: 'migrations',
  autoLoadEntities: true
};

export default typeORMConfig;