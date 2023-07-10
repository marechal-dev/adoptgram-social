import { Module } from '@nestjs/common';

import { CommonUsersController } from './controllers/common-users.controller';
import { NonGovernamentalOrganizationsController } from './controllers/non-governamental-organizations.controller';

@Module({
  controllers: [CommonUsersController, NonGovernamentalOrganizationsController],
  providers: [],
})
export class HttpModule {}
