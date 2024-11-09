// mission-team-member.dto.ts
import { IsOptional, IsInt } from 'class-validator';

export class CreateMissionTeamMemberDto {
  @IsInt()
  missionId: number;

  @IsOptional()
  @IsInt()
  driverId?: number;

  @IsOptional()
  @IsInt()
  missionLeaderId?: number;

  @IsOptional()
  @IsInt()
  emt1Id?: number;

  @IsOptional()
  @IsInt()
  emt2Id?: number;

  @IsOptional()
  @IsInt()
  emt3Id?: number;
}

export class UpdateMissionTeamMemberDto {
  @IsOptional()
  @IsInt()
  driverId?: number;

  @IsOptional()
  @IsInt()
  missionLeaderId?: number;

  @IsOptional()
  @IsInt()
  emt1Id?: number;

  @IsOptional()
  @IsInt()
  emt2Id?: number;

  @IsOptional()
  @IsInt()
  emt3Id?: number;
}
