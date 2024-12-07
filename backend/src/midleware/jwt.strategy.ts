import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log("JWT Payload:", payload); 
  
    if (payload.userType === 'ambulance') {
      return { id: payload.sub, vehicle_number: payload.vehicle_number, userType: payload.userType };
    } else if (payload.userType === 'admin') {
      return { id: payload.sub, username: payload.username, userType: payload.userType };
    }
    throw new UnauthorizedException('Invalid token');
  }
  
}
