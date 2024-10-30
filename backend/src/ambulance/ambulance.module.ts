// ambulance.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ambulance } from './ambulance.entity';
import { AmbulanceController } from './ambulance.controller';
import { AmbulanceService } from './ambulance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ambulance])],
  providers: [AmbulanceService],
  controllers: [AmbulanceController],
})
export class AmbulanceModule {}
