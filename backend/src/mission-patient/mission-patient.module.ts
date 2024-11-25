import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionPatient } from './mission-patient.entity';
import { MissionPatientService } from './mission-patient.service';
import { MissionPatientController } from './mission-patient.controller';
import { Mission } from '../missions/missions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionPatient, Mission])],
  controllers: [MissionPatientController],
  providers: [MissionPatientService],
})
export class MissionPatientModule {}