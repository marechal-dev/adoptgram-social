import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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
    private readonly jwt: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const authorizationHeaderValue = request.headers.authorization;

    if (!authorizationHeaderValue) {
      throw new UnauthorizedException();
    }

    const [_, token] = authorizationHeaderValue.split(' ');

    try {
      const payload = await this.jwt.verifyAsync<UserPayload>(token, {
        algorithms: ['RS256'],
        secret: Buffer.from(env.JWT_PUBLIC_KEY, 'base64'),
      });

      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
