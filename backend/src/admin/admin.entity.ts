import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique } from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 50)
  username: string;

  @Column()
  password_hash: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Method to set password hash
  async setPassword(password: string) {
    this.password_hash = await bcrypt.hash(password, 10);
  }

  // Method to compare passwords
  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password_hash);
  }
}
