import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleCheckup } from './vehicle-checkups.entity';
import { VehicleCheckupDto } from './vehicle-checkups.dto';
import { Ambulance } from '../ambulance/ambulance.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class VehicleCheckupService {
  constructor(
    @InjectRepository(VehicleCheckup)
    private vehicleCheckupRepository: Repository<VehicleCheckup>,
    @InjectRepository(Ambulance)
    private ambulanceRepository: Repository<Ambulance>,
  ) {}

  async createCheckup(ambulanceId: number): Promise<VehicleCheckup> {
    const checkup = new VehicleCheckup();
    checkup.ambulance = { id: ambulanceId } as Ambulance;
    checkup.is_checked = 'unchecked';
    return this.vehicleCheckupRepository.save(checkup);
  }

  async findAllForAmbulance(ambulanceId: number): Promise<VehicleCheckup[]> {
    return await this.vehicleCheckupRepository.find({
      where: { ambulance: { id: ambulanceId } },
      relations: ['ambulance'],
    });
  }

  async findOneForAmbulance(id: number, ambulanceId: number): Promise<VehicleCheckup | null> {
    return await this.vehicleCheckupRepository.findOne({
      where: { id, ambulance: { id: ambulanceId } },
      relations: ['ambulance'],
    });
  }

  async updateForAmbulance(id: number, ambulanceId: number, updateVehicleCheckupDto: VehicleCheckupDto): Promise<VehicleCheckup> {
    const checkup = await this.findOneForAmbulance(id, ambulanceId);
    if (!checkup) throw new NotFoundException(`Checkup with ID ${id} not found for this ambulance`);

    checkup.is_checked = updateVehicleCheckupDto.is_checked;
    checkup.checkup_date = new Date();
    return await this.vehicleCheckupRepository.save(checkup);
  }

  async removeForAmbulance(id: number, ambulanceId: number): Promise<void> {
    const checkup = await this.findOneForAmbulance(id, ambulanceId);
    if (!checkup) throw new NotFoundException(`Checkup with ID ${id} not found for this ambulance`);

    await this.vehicleCheckupRepository.remove(checkup);
  }

  // Scheduled job to reset checkups to "unchecked" every 24 hours
  @Cron('0 0 * * *') // This cron expression runs the job at midnight daily
  async resetCheckupsDaily(): Promise<void> {
    await this.vehicleCheckupRepository.createQueryBuilder()
      .update(VehicleCheckup)
      .set({ is_checked: 'unchecked' })
      .execute();
  }
}
