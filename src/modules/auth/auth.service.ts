import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { UsersRepository } from '@/shared/database/prisma/repositories';

import { SignUpDto } from './dto';
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

    const accessToken = this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;

    const saltRounds = 12;
    const hashedPassword = await hash(password, saltRounds);

    const user = await this.usersRepository.save({ name, email, password: hashedPassword });

    const accessToken = this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }
}
