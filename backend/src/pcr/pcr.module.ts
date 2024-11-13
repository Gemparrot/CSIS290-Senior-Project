import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PCR } from './pcr.entity';
import { Mission } from '../missions/missions.entity';
import { PCRService } from './pcr.service';
import { PCRController } from './pcr.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PCR, Mission])],
  providers: [PCRService],
  controllers: [PCRController],
})
export class PCRModule {}
