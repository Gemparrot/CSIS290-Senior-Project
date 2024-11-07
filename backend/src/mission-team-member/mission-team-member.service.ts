// mission-team-member.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionTeamMember } from './mission-team-member.entity';
import { CreateMissionTeamMemberDto, UpdateMissionTeamMemberDto } from './mission-team-member.dto';
import { Mission } from '../missions/missions.entity';
import { TeamMember } from '../team-members/team-members.entity';

@Injectable()
export class MissionTeamMemberService {
  constructor(
    @InjectRepository(MissionTeamMember)
    private missionTeamMemberRepository: Repository<MissionTeamMember>,
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
  ) {}

  async create(createMissionTeamMemberDto: CreateMissionTeamMemberDto): Promise<MissionTeamMember> {
    const mission = await this.missionRepository.findOneBy({ id: createMissionTeamMemberDto.missionId });

    const missionTeamMember = new MissionTeamMember();
    missionTeamMember.mission = mission;

    if (createMissionTeamMemberDto.driverId) {
      missionTeamMember.driver = await this.teamMemberRepository.findOneBy({ id: createMissionTeamMemberDto.driverId });
    }
    if (createMissionTeamMemberDto.missionLeaderId) {
      missionTeamMember.mission_leader = await this.teamMemberRepository.findOneBy({ id: createMissionTeamMemberDto.missionLeaderId });
    }
    if (createMissionTeamMemberDto.emt1Id) {
      missionTeamMember.emt1 = await this.teamMemberRepository.findOneBy({ id: createMissionTeamMemberDto.emt1Id });
    }
    if (createMissionTeamMemberDto.emt2Id) {
      missionTeamMember.emt2 = await this.teamMemberRepository.findOneBy({ id: createMissionTeamMemberDto.emt2Id });
    }
    if (createMissionTeamMemberDto.emt3Id) {
      missionTeamMember.emt3 = await this.teamMemberRepository.findOneBy({ id: createMissionTeamMemberDto.emt3Id });
    }

    return this.missionTeamMemberRepository.save(missionTeamMember);
  }

  async update(id: number, updateMissionTeamMemberDto: UpdateMissionTeamMemberDto): Promise<MissionTeamMember> {
    const missionTeamMember = await this.missionTeamMemberRepository.findOneBy({ id });

    if (updateMissionTeamMemberDto.driverId) {
      missionTeamMember.driver = await this.teamMemberRepository.findOneBy({ id: updateMissionTeamMemberDto.driverId });
    }
    if (updateMissionTeamMemberDto.missionLeaderId) {
      missionTeamMember.mission_leader = await this.teamMemberRepository.findOneBy({ id: updateMissionTeamMemberDto.missionLeaderId });
    }
    if (updateMissionTeamMemberDto.emt1Id) {
      missionTeamMember.emt1 = await this.teamMemberRepository.findOneBy({ id: updateMissionTeamMemberDto.emt1Id });
    }
    if (updateMissionTeamMemberDto.emt2Id) {
      missionTeamMember.emt2 = await this.teamMemberRepository.findOneBy({ id: updateMissionTeamMemberDto.emt2Id});
    }
    if (updateMissionTeamMemberDto.emt3Id) {
      missionTeamMember.emt3 = await this.teamMemberRepository.findOneBy({ id: updateMissionTeamMemberDto.emt3Id});
    }

    return this.missionTeamMemberRepository.save(missionTeamMember);
  }

  async findAll(): Promise<MissionTeamMember[]> {
    return this.missionTeamMemberRepository.find({ relations: ['mission', 'driver', 'mission_leader', 'emt1', 'emt2', 'emt3'] });
  }

  async findOne(id: number): Promise<MissionTeamMember> {
    return this.missionTeamMemberRepository.findOne({ where: { id }, relations: ['mission', 'driver', 'mission_leader', 'emt1', 'emt2', 'emt3'] });
  }

  async delete(id: number): Promise<void> {
    await this.missionTeamMemberRepository.delete(id);
  }
}
