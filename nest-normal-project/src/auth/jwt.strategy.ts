import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'.toLowerCase()), // 这里只能小写
      ignoreExpiration: false,
      secretOrKey:
        process.env.NEST_APP_JWT_SECRET || 'NEST_APP_TEST_JWT_SECRET',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
    };
  }
}
