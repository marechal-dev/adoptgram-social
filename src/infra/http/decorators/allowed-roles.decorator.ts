import { SetMetadata } from '@nestjs/common';

export type Roles = 'Admin' | 'Organization' | 'CommonUser';

export const AllowedRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
