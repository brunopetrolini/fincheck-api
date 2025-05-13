import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  authenticate(@Body() signInDto: SignInDto) {
    return this.authService.authenticate(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() signInDto: SignUpDto) {
    return this.authService.signUp(signInDto);
  }
}
