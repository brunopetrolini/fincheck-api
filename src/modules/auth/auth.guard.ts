import { type CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);

    if (!token) throw new UnauthorizedException('The provided token is invalid.');

    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request.user = { id: payload.sub };
    } catch {
      throw new UnauthorizedException('The provided token is invalid.');
    }

    return true;
  }

  private extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : null;
  }
}
