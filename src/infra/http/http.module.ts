import { Module } from '@nestjs/common';

import { CommonUsersController } from './controllers/common-users.controller';
// import { OrganizationsController } from './controllers/organizations.controller';

import { CreateCommonUserUseCase } from '@Application/use-cases/create-common-user';
import { PersistenceModule } from '@Infra/persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [CommonUsersController],
  providers: [CreateCommonUserUseCase],
})
export class HttpModule {}
