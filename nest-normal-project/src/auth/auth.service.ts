import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@/routes/user/user.service';
import { UserEntity } from '@/entities/user.entity';

import { encryptPassword } from '@/utils/index';

interface LoginJwt {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<LoginJwt> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userService.getInfoByName(name);
        const saltPwd = encryptPassword(password, user.salt);
        if (user.password === saltPwd) {
          const data = await this.certificate(user);
          resolve(data);
        } else {
          throw new Error('密码错误');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async certificate(user: UserEntity): Promise<LoginJwt> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = this.jwtService.sign({
          id: user.id,
          name: user.name,
        });
        resolve({
          token,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
