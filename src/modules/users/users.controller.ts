import { Controller, Get } from '@nestjs/common';

import { ActiveUserId } from '@/shared/decorators';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getProfile(userId);
  }
}
