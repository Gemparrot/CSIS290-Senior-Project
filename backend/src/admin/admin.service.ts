import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminRegisterDto, AdminLoginDto } from './admin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async register(registerDto: AdminRegisterDto): Promise<Admin> {
    const { email, password, username } = registerDto;

    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new BadRequestException('Admin with this email already exists');
    }

    const newAdmin = new Admin();
    newAdmin.email = email;
    newAdmin.username = username;
    await newAdmin.setPassword(password);

    return await this.adminRepository.save(newAdmin);
  }

  async validateAdminLogin(loginDto: AdminLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
  
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin || !(await admin.comparePassword(password))) {
      throw new NotFoundException('Invalid email or password');
    }
  
    const payload = { id: admin.id, username: admin.username, userType: 'admin' }; 
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("backend", admin.id);
    return { accessToken };
  }
}  