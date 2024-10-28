import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract token from header
      ignoreExpiration: false,  // Ensure the token has not expired
      secretOrKey: configService.get('JWT_SECRET'),  // Secret key
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };  // Return validated data
  }
}