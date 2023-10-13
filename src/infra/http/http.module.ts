import { Module } from '@nestjs/common';

import { AuthenticateCommonUserUseCase } from '@Domain/social-network/application/use-cases/authenticate-common-user';
import { AuthenticateOrganizationUseCase } from '@Domain/social-network/application/use-cases/authenticate-organization';
import { RegisterCommonUserUseCase } from '@Domain/social-network/application/use-cases/register-common-user';
import { RegisterOrganizationUseCase } from '@Domain/social-network/application/use-cases/register-organization';
import { CryptographyModule } from '@Infra/cryptography/cryptography.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { AuthenticateCommonUserController } from './controllers/authenticate-common-user.controller';
import { AuthenticateOrganizationController } from './controllers/authenticate-organization.controller';
import { RegisterCommonUserController } from './controllers/register-common-user.controller';
import { RegisterOrganizationController } from './controllers/register-organization.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateCommonUserController,
    AuthenticateOrganizationController,
    RegisterCommonUserController,
    RegisterOrganizationController,
  ],
  providers: [
    AuthenticateCommonUserUseCase,
    AuthenticateOrganizationUseCase,
    RegisterCommonUserUseCase,
    RegisterOrganizationUseCase,
  ],
})
export class HttpModule {}
