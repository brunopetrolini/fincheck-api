import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const ActiveUserId = createParamDecorator<undefined>((_: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();
  if (!request.user.id) throw new UnauthorizedException('User ID not found in request');
  return request.user.id;
});
