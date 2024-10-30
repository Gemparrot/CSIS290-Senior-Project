// missions.module.ts - auto generated file
// mission.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionService } from './missions.service';
import { MissionController } from './missions.controller';
import { Mission } from './missions.entity';
import { Ambulance } from '../ambulance/ambulance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, Ambulance])],
  controllers: [MissionController],
  providers: [MissionService],
})
export class MissionModule {}
