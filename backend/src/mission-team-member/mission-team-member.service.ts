import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    private readonly missionTeamMemberRepository: Repository<MissionTeamMember>,
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
  ) {}

  async create(createMissionTeamMemberDto: CreateMissionTeamMemberDto): Promise<MissionTeamMember> {
    const { missionId, teamMemberId, role } = createMissionTeamMemberDto;

    const mission = await this.missionRepository.findOne({ where: { id: missionId } });
    if (!mission) {
      throw new NotFoundException(`Mission with ID ${missionId} not found`);
    }

    const teamMember = await this.teamMemberRepository.findOne({ where: { id: teamMemberId } });
    if (!teamMember) {
      throw new NotFoundException(`Team member with ID ${teamMemberId} not found`);
    }

    // Check if the role already exists for the mission
    const existingAssignment = await this.missionTeamMemberRepository.findOne({
      where: { mission: { id: missionId }, role },
    });

    if (existingAssignment) {
      throw new BadRequestException(`A team member with the role ${role} is already assigned to this mission`);
    }

    const missionTeamMember = this.missionTeamMemberRepository.create({
      mission,
      teamMember,
      role,
    });

    return this.missionTeamMemberRepository.save(missionTeamMember);
  }

  async update(id: number, updateMissionTeamMemberDto: UpdateMissionTeamMemberDto): Promise<MissionTeamMember> {
    const missionTeamMember = await this.missionTeamMemberRepository.findOne({ where: { id } });
    if (!missionTeamMember) {
      throw new NotFoundException(`Mission team member with ID ${id} not found`);
    }

    const { missionId, teamMemberId, role } = updateMissionTeamMemberDto;

    if (missionId) {
      const mission = await this.missionRepository.findOne({ where: { id: missionId } });
      if (!mission) {
        throw new NotFoundException(`Mission with ID ${missionId} not found`);
      }
      missionTeamMember.mission = mission;
    }

    if (teamMemberId) {
      const teamMember = await this.teamMemberRepository.findOne({ where: { id: teamMemberId } });
      if (!teamMember) {
        throw new NotFoundException(`Team member with ID ${teamMemberId} not found`);
      }
      missionTeamMember.teamMember = teamMember;
    }

    if (role) {
      // Check if the role already exists for the mission
      const existingAssignment = await this.missionTeamMemberRepository.findOne({
        where: { mission: { id: missionTeamMember.mission.id }, role },
      });

      if (existingAssignment && existingAssignment.id !== id) {
        throw new BadRequestException(`A team member with the role ${role} is already assigned to this mission`);
      }

      missionTeamMember.role = role;
    }

    return this.missionTeamMemberRepository.save(missionTeamMember);
  }

  async findAll(): Promise<MissionTeamMember[]> {
    return this.missionTeamMemberRepository.find({ relations: ['mission', 'teamMember'] });
  }

  async findOne(id: number): Promise<MissionTeamMember> {
    const missionTeamMember = await this.missionTeamMemberRepository.findOne({ where: { id }, relations: ['mission', 'teamMember'] });
    if (!missionTeamMember) {
      throw new NotFoundException(`Mission team member with ID ${id} not found`);
    }
    return missionTeamMember;
  }

  async findByMissionId(missionId: number): Promise<MissionTeamMember[]> {
    return this.missionTeamMemberRepository.find({
      where: { mission: { id: missionId } },
      relations: ['mission', 'teamMember'],
    });
  }

  async delete(id: number): Promise<void> {
    const result = await this.missionTeamMemberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Mission team member with ID ${id} not found`);
    }
  }
}