import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

import { AuthService } from '@/auth/auth.service';
import {
  AddUserDto,
  UpdateUserPwdDto,
  UpdateUserNameDto,
  LoginDto,
} from '@/dtos/user.dto';
import { CurrentUser } from '@/decorator/user.decorator';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() body: AddUserDto) {
    return await this.userService.register(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.validateUser(body.name, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('Auth')
  @Put('/update/pwd')
  async updatePwd(
    @Body() body: UpdateUserPwdDto,
    @CurrentUser('id') id: string,
  ) {
    return await this.userService.updatePwd(body, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/name')
  async updateName(
    @Body() body: UpdateUserNameDto,
    @CurrentUser('id') id: string,
  ) {
    return await this.userService.updateName(body, id);
  }

  @Get('/info')
  async getInfo(@Query('id') id: string) {
    return await this.userService.getInfo(id);
  }
}
