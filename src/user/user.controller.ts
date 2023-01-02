import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';

import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import * as bcrypt from 'bcrypt';
import { User } from './model/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //post / signup
  @Post('/signup')
  async addUser(
    @Body('username') userName: string,
    @Body('password') userPassword: string,
    @Body('company') userCompany: string,
    @Body('role') userRole: string,   
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.userService.insertUser(userName, hashedPassword, userCompany, userRole);

    return {
      msg: 'Usuario se registro exitosamente.',
      userId: result.id,
      userName: result.username,
      company: result.company,
      role: result.role,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return {
      User: req.user,
      msg: 'Usuario logueado exitosamente.',
      company: req.company,
      role: req.role,
    };
  }

  // Get / protected
  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'Usted ha cerado sesión.' };
  }

  @Get('all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete('trash/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.deleteOne({ _id: id });
  }
}
