import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { randomUUID } from 'node:crypto';

import { UserEntity } from '@/entities/user.entity';
import {
  AddUserDto,
  UpdateUserPwdDto,
  UpdateUserNameDto,
} from '@/dtos/user.dto';

import { LogService } from '@/global/log.service';
import { makeSalt, encryptPassword } from '@/utils/index';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private logger: LogService,
  ) {}

  register(user: AddUserDto): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        if (user.password !== user.confirm_pwd) {
          throw new Error('密码不一致');
        }
        const findOne = await this.userRepo.findOne({
          where: {
            name: user.name,
          },
        });
        if (findOne && findOne.name === user.name) {
          throw new Error('用户名已存在');
        }
        const salt = makeSalt();
        const saltPwd = encryptPassword(user.password, salt);
        const newUser = this.userRepo.manager.create(UserEntity, {
          id: randomUUID(),
          password: saltPwd,
          name: user.name,
          salt,
        });
        await this.userRepo.manager.save(newUser);
        resolve('注册成功');
      } catch (error) {
        reject(error);
      }
    });
  }

  updatePwd(data: UpdateUserPwdDto, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOne({
          where: {
            id,
          },
        });
        if (!user) {
          throw new Error('用户不存在');
        }
        const oldPwd = encryptPassword(data.old_pwd, user.salt);
        if (oldPwd !== user.password) {
          throw new Error('原密码错误');
        }
        if (data.password !== data.confirm_pwd) {
          throw new Error('新密码不一致');
        }
        const newPwd = encryptPassword(data.password, user.salt);
        await this.userRepo.update(user.id, {
          password: newPwd,
        });
        resolve('修改密码成功');
      } catch (error) {
        reject(error);
      }
    });
  }

  updateName(data: UpdateUserNameDto, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOne({
          where: {
            id,
          },
        });
        if (!user) {
          throw new Error('用户不存在');
        }
        const findOne = await this.userRepo.findOne({
          where: {
            name: data.name,
          },
        });
        // 如果存在相同用户名
        if (findOne && findOne.id !== user.id) {
          throw new Error('用户名已存在');
        }
        await this.userRepo.update(user.id, {
          name: data.name,
        });
        resolve('修改用户名成功');
      } catch (error) {
        reject(error);
      }
    });
  }

  getInfo(id: string): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOne({
          where: {
            id,
          },
          select: ['id', 'name'],
        });
        if (!user) {
          throw new Error('用户不存在');
        }
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  getInfoByName(name: string): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOne({
          where: {
            name,
          },
        });
        if (!user) {
          throw new Error('用户不存在');
        }
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}
