import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../admin/admin.entity';

@Entity()
@Unique(['vehicle_number'])
export class Ambulance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicle_number: string;

  @Column()
  password: string;

  @ManyToOne(() => Admin, (admin) => admin.id, { nullable: true })
  admin: Admin;

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
