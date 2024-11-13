import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Admin } from '../admin/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambulance } from './ambulance.entity';
import { AmbulanceDto } from './ambulance.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AmbulanceService {
  constructor(
    @InjectRepository(Ambulance)
    private readonly ambulanceRepository: Repository<Ambulance>
  ) {}

  async createAmbulance(dto: AmbulanceDto, adminId: number): Promise<Ambulance> {
    const ambulance = new Ambulance();
    ambulance.vehicle_number = dto.vehicle_number;
    await ambulance.setPassword(dto.password);
    ambulance.admin = { id: adminId } as Admin;
  
    return this.ambulanceRepository.save(ambulance);
  }

  async login(dto: AmbulanceDto): Promise<{ accessToken: string }> {
    const ambulance = await this.ambulanceRepository.findOne({
      where: { vehicle_number: dto.vehicle_number },
    });
  
    if (!ambulance || !(await ambulance.comparePassword(dto.password))) {
      throw new UnauthorizedException('Invalid vehicle number or password');
    }
  
    const payload = { vehicle_number: ambulance.vehicle_number, sub: ambulance.id, userType: 'ambulance' };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    return { accessToken };
  }

  async getAllAmbulances(adminId: number): Promise<Ambulance[]> {
    return this.ambulanceRepository.find({ where: { admin: { id: adminId } } });
  }

  async getAmbulanceById(id: number, adminId: number): Promise<Ambulance> {
    const ambulance = await this.ambulanceRepository.findOne({
      where: { id, admin: { id: adminId } },
    });
    if (!ambulance) {
      throw new BadRequestException(`Ambulance with ID ${id} not found`);
    }
    return ambulance;
  }

  async updateAmbulance(id: number, dto: AmbulanceDto, adminId: number): Promise<Ambulance> {
    const ambulance = await this.getAmbulanceById(id, adminId);
    if (dto.vehicle_number) ambulance.vehicle_number = dto.vehicle_number;
    if (dto.password) await ambulance.setPassword(dto.password);
    return this.ambulanceRepository.save(ambulance);
  }

  async deleteAmbulance(id: number, adminId: number): Promise<void> {
    const ambulance = await this.getAmbulanceById(id, adminId);
    await this.ambulanceRepository.remove(ambulance);
  }
}
