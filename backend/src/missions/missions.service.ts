import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission } from './missions.entity';
import { MissionDto } from './missions.dto';
import { Ambulance } from '../ambulance/ambulance.entity';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
    @InjectRepository(Ambulance)
    private ambulanceRepository: Repository<Ambulance>,
  ) {}

  async create(missionDto: MissionDto): Promise<Mission> {
    const mission = this.missionRepository.create(missionDto);

    // Assign ambulance if provided
    if (missionDto.ambulanceId) {
      const ambulance = await this.ambulanceRepository.findOne({ where: { id: missionDto.ambulanceId } });
      if (!ambulance) throw new NotFoundException('Ambulance not found');
      mission.ambulance = ambulance;
    }

    return await this.missionRepository.save(mission);
  }

  async findAll(): Promise<Mission[]> {
    return await this.missionRepository.find({ relations: ['ambulance'] });
  }

  async findPending(): Promise<Mission[]> {
    return await this.missionRepository.find({
      where: { status: 'pending' },
      relations: ['ambulance'],
    });
  }

  async findOne(id: number): Promise<Mission> {
    const mission = await this.missionRepository.findOne({ where: { id }, relations: ['ambulance'] });
    if (!mission) throw new NotFoundException(`Mission with ID ${id} not found`);
    return mission;
  }

  async update(id: number, missionDto: MissionDto): Promise<Mission> {
    const mission = await this.findOne(id);

    if (missionDto.ambulanceId) {
      const ambulance = await this.ambulanceRepository.findOne({ where: { id: missionDto.ambulanceId } });
      if (!ambulance) throw new NotFoundException('Ambulance not found');
      mission.ambulance = ambulance;
    }

    Object.assign(mission, missionDto);
    return await this.missionRepository.save(mission);
  }

  async remove(id: number): Promise<void> {
    const mission = await this.findOne(id);
    await this.missionRepository.remove(mission);
  }
}
