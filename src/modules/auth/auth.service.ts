import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { UsersRepository } from '@/shared/database/prisma/repositories';

import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credentials are invalid.');

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Credentials are invalid.');

    const accessToken = this.jwtService.sign({ sub: user.id });

    return { accessToken };
  }
}
