import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../midleware/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', 
      signOptions: { expiresIn: '1h' },  
    }),
  ],
  providers: [AdminService, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
