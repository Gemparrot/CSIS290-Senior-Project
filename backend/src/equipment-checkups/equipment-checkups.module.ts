import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentCheckup } from './equipment-checkups.entity';
import { EquipmentCheckupService } from './equipment-checkups.service';
import { EquipmentCheckupController } from './equipment-checkups.controller';
import { Ambulance } from '../ambulance/ambulance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentCheckup, Ambulance])],
  controllers: [EquipmentCheckupController],
  providers: [EquipmentCheckupService],
})
export class EquipmentCheckupModule {}
