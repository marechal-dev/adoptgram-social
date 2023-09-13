import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

import { env } from '@Configs/env';

import { IS_PUBLIC_KEY } from './decorators/is-public-route.decorator';

export type UserPayload = {
  sub: string;
  username: string;
  email: string;
  kind: 'Admin' | 'CommonUser' | 'Organization';
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const authorizationHeaderValue = request.headers.authorization;

    if (!authorizationHeaderValue) {
      throw new UnauthorizedException();
    }

    const [_, token] = authorizationHeaderValue.split('');

    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
        publicKey: env.JWT_PUBLIC_KEY,
      });

      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
