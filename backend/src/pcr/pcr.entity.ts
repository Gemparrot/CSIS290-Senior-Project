import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  CreateDateColumn 
} from 'typeorm';
import { Mission } from '../missions/missions.entity';
import { MissionPatient } from '../mission-patient/mission-patient.entity';

@Entity()
export class PCR {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'json', nullable: true })
  primary_assessment: any;

  @ManyToOne(() => Mission, (mission) => mission.id, { nullable: true })
  mission: Mission;

  @ManyToOne(() => MissionPatient, (patient) => patient.id, { nullable: true })
  patient: MissionPatient; // Maps to patientId in the table

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;
}
