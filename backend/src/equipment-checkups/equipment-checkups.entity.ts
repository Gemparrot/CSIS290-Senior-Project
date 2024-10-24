import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ambulance } from '../ambulance/ambulance.entity';

@Entity()
export class EquipmentCheckup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ambulance, (ambulance) => ambulance.id, { nullable: true })
  ambulance: Ambulance;

  @CreateDateColumn({ type: 'timestamp' })
  checkup_date: Date;

  @Column({ type: 'enum', enum: ['checked', 'unchecked'], default: 'unchecked' })
  is_checked: string;
}
