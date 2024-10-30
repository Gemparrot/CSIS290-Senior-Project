import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleCheckupService } from './vehicle-checkups.service';
import { VehicleCheckupController } from './vehicle-checkups.controller';
import { VehicleCheckup } from './vehicle-checkups.entity';
import { Ambulance } from '../ambulance/ambulance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleCheckup, Ambulance])],
  controllers: [VehicleCheckupController],
  providers: [VehicleCheckupService],
})
export class VehicleCheckupModule {}
