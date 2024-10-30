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
  
    // Find and assign the admin who created this ambulance
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

    const payload = { id: ambulance.id, vehicle_number: ambulance.vehicle_number };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { accessToken };
  }
}