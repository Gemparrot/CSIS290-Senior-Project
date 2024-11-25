import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionPatient } from './mission-patient.entity';
import { CreateMissionPatientDto, UpdateMissionPatientDto } from './mission-patient.dto';
import { Mission } from '../missions/missions.entity';

@Injectable()
export class MissionPatientService {
  constructor(
    @InjectRepository(MissionPatient)
    private readonly missionPatientRepository: Repository<MissionPatient>,
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,
  ) {}

  async create(createMissionPatientDto: CreateMissionPatientDto): Promise<MissionPatient> {
    const { missionId, patientName } = createMissionPatientDto;

    const mission = await this.missionRepository.findOne({ where: { id: missionId } });
    if (!mission) {
      throw new NotFoundException(`Mission with ID ${missionId} not found`);
    }

    const missionPatient = this.missionPatientRepository.create({
      mission,
      patientName,
    });

    return this.missionPatientRepository.save(missionPatient);
  }

  async findOne(id: number): Promise<MissionPatient> {
    const missionPatient = await this.missionPatientRepository.findOne({ where: { id }, relations: ['mission'] });
    if (!missionPatient) {
      throw new NotFoundException(`Mission patient with ID ${id} not found`);
    }
    return missionPatient;
  }

  async findByMissionId(missionId: number): Promise<MissionPatient[]> {
    return this.missionPatientRepository.find({
      where: { mission: { id: missionId } },
      relations: ['mission'],
    });
  }

  async update(id: number, updateMissionPatientDto: UpdateMissionPatientDto): Promise<MissionPatient> {
    const missionPatient = await this.missionPatientRepository.findOne({ where: { id } });
    if (!missionPatient) {
      throw new NotFoundException(`Mission patient with ID ${id} not found`);
    }

    const { missionId, patientName } = updateMissionPatientDto;

    if (missionId) {
      const mission = await this.missionRepository.findOne({ where: { id: missionId } });
      if (!mission) {
        throw new NotFoundException(`Mission with ID ${missionId} not found`);
      }
      missionPatient.mission = mission;
    }

    if (patientName) {
      missionPatient.patientName = patientName;
    }

    return this.missionPatientRepository.save(missionPatient);
  }

  async delete(id: number): Promise<void> {
    const result = await this.missionPatientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Mission patient with ID ${id} not found`);
    }
  }
}