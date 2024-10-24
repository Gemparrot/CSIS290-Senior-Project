import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRegisterDto, AdminLoginDto } from './admin.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

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

  // Example of a protected route
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;  // Accessing user from validated JWT token
  }
}
