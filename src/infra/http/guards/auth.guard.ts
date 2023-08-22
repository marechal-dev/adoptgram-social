import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

import env from '@Configs/env';
import { JwtPayload } from '@Infra/utils/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    if (!this.authorizationHeaderExists(request)) {
      throw new UnauthorizedException('Cabeçalho de Autenticação ausente.');
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token ausente.');
    }

    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: env.JWT_SECRET,
      })) satisfies JwtPayload;

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token inválido.');
    }

    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | null {
    const [, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token) {
      return null;
    }

    return token;
  }

  private authorizationHeaderExists(request: FastifyRequest): boolean {
    if (!request.headers.authorization) {
      return false;
    }

    return true;
  }
}
