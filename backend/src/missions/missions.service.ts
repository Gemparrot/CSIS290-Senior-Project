import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async create(missionDto: MissionDto, ambulanceId: number | null): Promise<Mission> {
    const mission = this.missionRepository.create(missionDto);

    if (ambulanceId) {
      const ambulance = await this.ambulanceRepository.findOne({ where: { id: ambulanceId } });
      if (!ambulance) throw new NotFoundException('Ambulance not found');
      mission.ambulance = ambulance;
    }

    return await this.missionRepository.save(mission);
  }

  async findAll(): Promise<Mission[]> {
    return await this.missionRepository.find({ where: { status: 'completed' }, relations: ['ambulance'] });
  }

  async findPending(ambulanceId: number): Promise<Mission[]> {
    return await this.missionRepository.find({
      where: { status: 'pending', ambulance: { id: ambulanceId } },
      relations: ['ambulance'],
    });
  }

  async findOne(id: number, ambulanceId: number): Promise<Mission> {
    const mission = await this.missionRepository.findOne({ where: { id, ambulance: { id: ambulanceId } }, relations: ['ambulance'] });
    if (!mission) throw new NotFoundException(`Mission with ID ${id} not found`);
    return mission;
  }

  async update(id: number, missionDto: MissionDto, ambulanceId: number): Promise<Mission> {
    const mission = await this.findOne(id, ambulanceId);

    if (missionDto.ambulanceId) {
      const ambulance = await this.ambulanceRepository.findOne({ where: { id: missionDto.ambulanceId } });
      if (!ambulance) throw new NotFoundException('Ambulance not found');
      mission.ambulance = ambulance;
    }

    if (missionDto.status === 'completed' && !mission.completed_at) {
      mission.completed_at = new Date();
    }
    if (missionDto.status === 'canceled' && !mission.canceled_at) {
      mission.canceled_at = new Date();
    }

    Object.assign(mission, missionDto);
    return await this.missionRepository.save(mission);
  }

  async remove(id: number, ambulanceId: number): Promise<void> {
    const mission = await this.findOne(id, ambulanceId);
    await this.missionRepository.remove(mission);
  }
}
