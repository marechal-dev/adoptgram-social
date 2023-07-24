import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import env from '@Configs/env';

import { CommonUsersController } from './controllers/common-users.controller';
// import { OrganizationsController } from './controllers/organizations.controller';

import { CreateCommonUserUseCase } from '@Application/use-cases/create-common-user';
import { PersistenceModule } from '@Infra/persistence/persistence.module';
import { OrganizationsController } from './controllers/organizations.controller';
import { CreateOrganizationUseCase } from '@Application/use-cases/create-organization';
import { AuthController } from './controllers/auth.controller';
import { AuthenticateUserUseCase } from '@Application/use-cases/authenticate-user';

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
    PersistenceModule,
  ],
  controllers: [CommonUsersController, OrganizationsController, AuthController],
  providers: [
    CreateCommonUserUseCase,
    CreateOrganizationUseCase,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
