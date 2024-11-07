// mission-team-member.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionTeamMember } from './mission-team-member.entity';
import { MissionTeamMemberService } from './mission-team-member.service';
import { MissionTeamMemberController } from './mission-team-member.controller';
import { Mission } from '../missions/missions.entity';
import { TeamMember } from '../team-members/team-members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionTeamMember, Mission, TeamMember])],
  controllers: [MissionTeamMemberController],
  providers: [MissionTeamMemberService],
})
export class MissionTeamMemberModule {}
