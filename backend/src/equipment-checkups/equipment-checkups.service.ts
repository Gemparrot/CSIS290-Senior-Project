import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentCheckup } from './equipment-checkups.entity';
import { EquipmentCheckupDto } from './equipment-checkups.dto';
import { Ambulance } from '../ambulance/ambulance.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class EquipmentCheckupService {
  constructor(
    @InjectRepository(EquipmentCheckup)
    private equipmentCheckupRepository: Repository<EquipmentCheckup>,
    @InjectRepository(Ambulance)
    private ambulanceRepository: Repository<Ambulance>,
  ) {}

  async createCheckup(ambulanceId: number): Promise<EquipmentCheckup> {
    const checkup = new EquipmentCheckup();
    checkup.ambulance = { id: ambulanceId } as Ambulance;
    checkup.is_checked = 'unchecked';
    return this.equipmentCheckupRepository.save(checkup);
  }

  async findAllForAmbulance(ambulanceId: number): Promise<EquipmentCheckup[]> {
    return await this.equipmentCheckupRepository.find({
      where: { ambulance: { id: ambulanceId } },
      relations: ['ambulance'],
    });
  }

  async findOneForAmbulance(id: number, ambulanceId: number): Promise<EquipmentCheckup | null> {
    return await this.equipmentCheckupRepository.findOne({
      where: { id, ambulance: { id: ambulanceId } },
      relations: ['ambulance'],
    });
  }

  async updateForAmbulance(id: number, ambulanceId: number, updateEquipmentCheckupDto: EquipmentCheckupDto): Promise<EquipmentCheckup> {
    const checkup = await this.findOneForAmbulance(id, ambulanceId);
    if (!checkup) throw new NotFoundException(`Checkup with ID ${id} not found for this ambulance`);

    checkup.is_checked = updateEquipmentCheckupDto.is_checked;
    checkup.checkup_date = new Date();
    return await this.equipmentCheckupRepository.save(checkup);
  }

  async removeForAmbulance(id: number, ambulanceId: number): Promise<void> {
    const checkup = await this.findOneForAmbulance(id, ambulanceId);
    if (!checkup) throw new NotFoundException(`Checkup with ID ${id} not found for this ambulance`);

    await this.equipmentCheckupRepository.remove(checkup);
  }

  @Cron('0 0 * * *') // Reset checkups daily at midnight
  async resetCheckupsDaily(): Promise<void> {
    await this.equipmentCheckupRepository.createQueryBuilder()
      .update(EquipmentCheckup)
      .set({ is_checked: 'unchecked' })
      .execute();
  }
}
