// team-member.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './team-members.entity';
import { TeamMemberDto } from './team-members.dto';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
  ) {}

  async create(teamMemberDto: TeamMemberDto): Promise<TeamMember> {
    const teamMember = this.teamMemberRepository.create(teamMemberDto);
    return await this.teamMemberRepository.save(teamMember);
  }

  async findAll(): Promise<TeamMember[]> {
    return await this.teamMemberRepository.find();
  }

  async findOne(id: number): Promise<TeamMember> {
    const teamMember = await this.teamMemberRepository.findOne({ where: { id } });
    if (!teamMember) {
      throw new NotFoundException(`TeamMember with ID ${id} not found`);
    }
    return teamMember;
  }

  async update(id: number, teamMemberDto: TeamMemberDto): Promise<TeamMember> {
    await this.findOne(id);
    await this.teamMemberRepository.update(id, teamMemberDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.teamMemberRepository.delete(id);
  }
}
