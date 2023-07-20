import { SetMetadata } from '@nestjs/common';

export type Roles = 'Admin' | 'CommonUser' | 'Organization';

export const AllowedRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
