import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Mission } from '../missions/missions.entity';

@Entity()
export class MissionPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mission, (mission) => mission.id, { nullable: false })
  mission: Mission;

  @Column({ type: 'varchar', length: 255, nullable: false })
  patientName: string;
}