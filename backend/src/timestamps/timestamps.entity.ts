import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Mission } from '../missions/missions.entity';

@Entity()
export class Timestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mission, (mission) => mission.id, { nullable: true, onDelete: 'CASCADE' })
  mission: Mission;

  @Column({
    type: 'enum',
    enum: ['departure_to_case', 'arrival_to_case', 'departure_to_destination', 'arrival_to_destination', 'unit_available', 'arrival_to_station'],
  })
  event: string;

  @Column({ type: 'datetime' })
  timestamp: Date;
}
