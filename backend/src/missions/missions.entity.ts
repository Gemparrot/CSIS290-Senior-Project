import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ambulance } from '../ambulance/ambulance.entity';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['emergency', 'transportation'], default: 'emergency' })
  mission_type: string;

  @Column('text')
  description: string;

  @Column('text')
  address: string;

  @ManyToOne(() => Ambulance, (ambulance) => ambulance.id, { nullable: true })
  ambulance: Ambulance;

  @Column({ type: 'enum', enum: ['pending', 'active', 'completed', 'canceled'], default: 'pending' })
  status: string;

  @Column({ type: 'json', nullable: true })
  images: any;

  @Column({ default: 1 })
  patient_count: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  canceled_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;
}
