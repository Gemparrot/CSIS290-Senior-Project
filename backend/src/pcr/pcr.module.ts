import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PCR } from './pcr.entity';
import { Mission } from '../missions/missions.entity';
import { MissionPatient } from '../mission-patient/mission-patient.entity'; 
import { PCRService } from './pcr.service';
import { PCRController } from './pcr.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([PCR, Mission, MissionPatient]),
  HttpModule,
  ],
  providers: [PCRService],
  controllers: [PCRController],
})
export class PCRModule {}
