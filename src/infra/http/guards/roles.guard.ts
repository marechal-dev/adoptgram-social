import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { Roles } from '../decorators/allowed-roles.decorator';

export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
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
