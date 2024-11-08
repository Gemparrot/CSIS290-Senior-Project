import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { AmbulanceModule } from './ambulance/ambulance.module';
import { TeamMemberModule } from './team-members/team-members.module';
import { VehicleCheckupModule } from './vehicle-checkups/vehicle-checkups.module';
import { EquipmentCheckupModule } from './equipment-checkups/equipment-checkups.module';
import { MissionModule } from './missions/missions.module';
import { MissionTeamMemberModule } from './mission-team-member/mission-team-member.module';
import { TimestampsModule } from './timestamps/timestamps.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AdminModule,
    AmbulanceModule,
    MissionModule,
    VehicleCheckupModule,
    EquipmentCheckupModule,
    TeamMemberModule,
    MissionTeamMemberModule,
    TimestampsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
