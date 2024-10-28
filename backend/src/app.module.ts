import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { AmbulanceModule } from './ambulance/ambulance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AdminModule,
    AmbulanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
