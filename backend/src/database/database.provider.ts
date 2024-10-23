import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProvider = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'redcross',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, 
});
