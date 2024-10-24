import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Length } from 'class-validator';

@Entity()
@Unique(['vehicle_number'])
export class Ambulance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 50)
  vehicle_number: string;

  @Column()
  password: string;

  // Method to set password hash
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  // Method to compare passwords
  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
