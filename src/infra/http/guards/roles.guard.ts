import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

import { Roles } from '../decorators/allowed-roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<Roles[]>('roles', ctx.getHandler());
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    const user = request.user;
    if (!user) {
      return false;
    }

    return this.rolesMatch(roles, user.kind);
  }

  private rolesMatch(roles: Roles[], userRole: Roles): boolean {
    return !!roles.find((role) => role === userRole);
  }
}
