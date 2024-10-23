import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProvider } from './database.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: databaseProvider,
    }),
  ],
})
export class DatabaseModule {}
