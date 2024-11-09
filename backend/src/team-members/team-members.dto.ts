import { IsString, IsOptional } from 'class-validator';

export class TeamMemberDto {
  @IsString()
  @IsOptional()
  name?: string;
}
