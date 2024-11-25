import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Mission } from '../missions/missions.entity';
import { TeamMember } from '../team-members/team-members.entity';

export enum Role {
  MISSION_LEADER = 'missionLeader',
  DRIVER = 'driver',
  EMT1 = 'emt1',
  EMT2 = 'emt2',
  EMT3 = 'emt3',
}

@Entity()
export class MissionTeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mission, (mission) => mission.id, { nullable: false })
  mission: Mission;

  @ManyToOne(() => TeamMember, { nullable: false })
  teamMember: TeamMember;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;
}