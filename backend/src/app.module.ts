import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
// import { MissionModule } from './modules/mission/mission.module';
// import { PCRModule } from './modules/pcr/pcr.module';
// import { UserModule } from './modules/user/user.module';
// import { CheckupModule } from './modules/checkup/checkup.module';
// import { TimestampModule } from './modules/timestamp/timestamp.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
