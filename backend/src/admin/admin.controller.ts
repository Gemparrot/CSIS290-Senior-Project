import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRegisterDto, AdminLoginDto } from './admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body() registerDto: AdminRegisterDto) {
    return await this.adminService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: AdminLoginDto) {
    return await this.adminService.validateAdminLogin(loginDto);
  }
}