import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timestamps } from './timestamps.entity';
import { Mission } from '../missions/missions.entity';
import { CreateTimestampDto } from './timestamps.dto';

@Injectable()
export class TimestampsService {
  constructor(
    @InjectRepository(Timestamps)
    private timestampsRepository: Repository<Timestamps>,
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
  ) {}

  async create(missionId: number, createTimestampDto: CreateTimestampDto): Promise<Timestamps> {
    const mission = await this.missionRepository.findOne({ where: { id: missionId } });
    if (!mission) throw new NotFoundException(`Mission with ID ${missionId} not found`);

    const timestamp = new Timestamps();
    timestamp.mission = mission;
    timestamp.event = createTimestampDto.event;
    timestamp.timestamp = new Date(); 
    return this.timestampsRepository.save(timestamp);
  }

  async findAllForMission(missionId: number): Promise<Timestamps[]> {
    return await this.timestampsRepository.find({
      where: { mission: { id: missionId } },
      order: { timestamp: 'ASC' },
    });
  }

  async findOneForMission(id: number, missionId: number): Promise<Timestamps | null> {
    return await this.timestampsRepository.findOne({
      where: { id, mission: { id: missionId } },
    });
  }
}
