import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Mission } from '../missions/missions.entity';
import { TeamMember } from '../team-members/team-members.entity';

@Entity()
export class MissionTeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mission, (mission) => mission.id, { nullable: true })
  mission: Mission;

  @ManyToOne(() => TeamMember, { nullable: true })
  driver: TeamMember;

  @ManyToOne(() => TeamMember, { nullable: true })
  mission_leader: TeamMember;

  @ManyToOne(() => TeamMember, { nullable: true })
  emt1: TeamMember;

  @ManyToOne(() => TeamMember, { nullable: true })
  emt2: TeamMember;

  @ManyToOne(() => TeamMember, { nullable: true })
  emt3: TeamMember;
}
