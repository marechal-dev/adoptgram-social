import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import env from '@Configs/env';

import { PersistenceModule } from '@Infra/persistence/persistence.module';
import { CommonUsersController } from './controllers/common-users.controller';
import { CreateCommonUserUseCase } from '@Application/use-cases/create-common-user';
import { OrganizationsController } from './controllers/organizations.controller';
import { CreateOrganizationUseCase } from '@Application/use-cases/create-organization';
import { AuthenticateUserUseCase } from '@Application/use-cases/authenticate-user';
import { AuthController } from './controllers/auth.controller';

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
