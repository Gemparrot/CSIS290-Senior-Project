import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminRegisterDto, AdminLoginDto } from './admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  // Import JWT Service

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,  // Inject JWT Service
  ) {}

  // Register a new admin
  async register(registerDto: AdminRegisterDto): Promise<Admin> {
    const { email, password, username } = registerDto;

    // Check if the admin already exists
    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new BadRequestException('Admin with this email already exists');
    }

    // Create new admin instance and hash the password
    const newAdmin = new Admin();
    newAdmin.email = email;
    newAdmin.username = username;
    await newAdmin.setPassword(password);

    return await this.adminRepository.save(newAdmin);
  }

  // Validate admin login and return JWT token
  async validateAdminLogin(loginDto: AdminLoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin || !(await admin.comparePassword(password))) {
      throw new NotFoundException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { username: admin.username, sub: admin.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
