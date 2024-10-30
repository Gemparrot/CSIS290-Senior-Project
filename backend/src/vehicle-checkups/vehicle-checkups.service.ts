import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleCheckup } from './vehicle-checkups.entity';
import { VehicleCheckupDto } from './vehicle-checkups.dto';
import { Ambulance } from '../ambulance/ambulance.entity';

@Injectable()
export class VehicleCheckupService {
  remove(id: number) {
      throw new Error('Method not implemented.');
  }
  update(id: number, updateVehicleCheckupDto: VehicleCheckupDto) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(VehicleCheckup)
    private vehicleCheckupRepository: Repository<VehicleCheckup>,
    @InjectRepository(Ambulance)
    private ambulanceRepository: Repository<Ambulance>,
  ) {}

  async create(createVehicleCheckupDto: VehicleCheckupDto): Promise<VehicleCheckup> {
    const checkup = this.vehicleCheckupRepository.create(createVehicleCheckupDto);

    if (createVehicleCheckupDto.ambulanceId) {
      const ambulance = await this.ambulanceRepository.findOne({ where: { id: createVehicleCheckupDto.ambulanceId } });
      if (!ambulance) throw new NotFoundException('Ambulance not found');
      checkup.ambulance = ambulance;
    }

    return await this.vehicleCheckupRepository.save(checkup);
  }

  async findAll(): Promise<VehicleCheckup[]> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    // Reset checkups for vehicles older than today
    await this.vehicleCheckupRepository.createQueryBuilder()
      .update(VehicleCheckup)
      .set({ is_checked: 'unchecked' })
      .where('checkup_date < :date', { date: startOfDay })
      .execute();

    return await this.vehicleCheckupRepository.find({ relations: ['ambulance'] });
  }

  async findOne(id: number): Promise<VehicleCheckup> {
    const checkup = await this.vehicleCheckupRepository.findOne({ where: { id }, relations: ['ambulance'] });
    if (!checkup) throw new NotFoundException(`Checkup with ID ${id} not found`);
    return checkup;
  }

  async checkVehicle(ambulanceId: number): Promise<VehicleCheckup> {
    const checkup = await this.vehicleCheckupRepository.findOne({ where: { ambulance: { id: ambulanceId } } });

    if (!checkup) {
      // If no checkup exists for the ambulance, create a new one
      const newCheckup = this.vehicleCheckupRepository.create({
        ambulance: { id: ambulanceId } as Ambulance,
        is_checked: 'checked',
        checkup_date: new Date(),
      });
      return await this.vehicleCheckupRepository.save(newCheckup);
    }

    // Update existing checkup to "checked"
    checkup.is_checked = 'checked';
    checkup.checkup_date = new Date(); 
    return await this.vehicleCheckupRepository.save(checkup);
  }

  async uncheckVehicle(ambulanceId: number): Promise<VehicleCheckup> {
    const checkup = await this.vehicleCheckupRepository.findOne({ where: { ambulance: { id: ambulanceId } } });

    if (!checkup) {
      throw new NotFoundException('No checkup found for this ambulance');
    }

    checkup.is_checked = 'unchecked';
    return await this.vehicleCheckupRepository.save(checkup);
  }

  async createCheckup(ambulanceId: number): Promise<VehicleCheckup> {
    const checkup = new VehicleCheckup();
    checkup.ambulance = { id: ambulanceId } as Ambulance;
    checkup.is_checked = 'unchecked';
    return this.vehicleCheckupRepository.save(checkup);
  }
  
}