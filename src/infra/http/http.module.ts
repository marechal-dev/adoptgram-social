import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { CommonUsersController } from './controllers/common-users.controller';
import { OrganizationsController } from './controllers/organizations.controller';

import { AuthService } from '@Infra/services/auth/auth.service';

@Module({
  controllers: [AuthController, CommonUsersController, OrganizationsController],
  providers: [AuthService],
})
export class HttpModule {}
