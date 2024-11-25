import { Role } from './mission-team-member.entity';

export class CreateMissionTeamMemberDto {
  missionId: number;
  teamMemberId: number;
  role: Role;
}

export class UpdateMissionTeamMemberDto {
  missionId?: number;
  teamMemberId?: number;
  role?: Role;
}