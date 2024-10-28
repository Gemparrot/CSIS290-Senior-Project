import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
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

  async createAmbulance(dto: AmbulanceDto): Promise<Ambulance> {
    const ambulance = new Ambulance();
    ambulance.vehicle_number = dto.vehicle_number;
    await ambulance.setPassword(dto.password);

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
    const accessToken = jwt.sign(payload, '"aP1nv$J87nB!K7qXp9&Z8gTb@Hf2Vm#sR%4yLwE"', { expiresIn: '1h' });

    return { accessToken };
  }
}