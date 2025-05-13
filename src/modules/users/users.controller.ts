import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@Req() request: Request) {
    return this.usersService.getProfile(request.user.id);
  }
}
