import { Module } from '@nestjs/common';

import { CommonUsersController } from './controllers/common-users.controller';
import { OrganizationsController } from './controllers/organizations.controller';

@Module({
  controllers: [CommonUsersController, OrganizationsController],
  providers: [],
})
export class HttpModule {}
