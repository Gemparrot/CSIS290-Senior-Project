import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Mission } from '../missions/missions.entity';

@Entity()
export class PCR {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mission, (mission) => mission.id, { nullable: true })
  mission: Mission;

  @Column({ type: 'json', nullable: true })
  primary_assessment: any;

  @Column({ type: 'json', nullable: true })
  body_section: any;

  @Column({ type: 'json', nullable: true })
  vitals: any;

  @Column({ type: 'json', nullable: true })
  management: any;

  @Column({ type: 'json', nullable: true })
  clinical_info: any;

  @Column({ type: 'json', nullable: true })
  patient_details: any;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
