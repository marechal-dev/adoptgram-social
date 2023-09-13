import { Module } from '@nestjs/common';

import { DatabaseModule } from '@Infra/database/database.module';
import { CryptographyModule } from '@Infra/cryptography/cryptography.module';
import { AuthenticateCommonUserController } from './controllers/authenticate-common-user.controller';
import { AuthenticateOrganizationController } from './controllers/authenticate-organization.controller';
import { AuthenticateCommonUserUseCase } from '@Domain/social-network/application/use-cases/authenticate-common-user';
import { AuthenticateOrganizationUseCase } from '@Domain/social-network/application/use-cases/authenticate-organization';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateCommonUserController,
    AuthenticateOrganizationController,
  ],
  providers: [AuthenticateCommonUserUseCase, AuthenticateOrganizationUseCase],
})
export class HttpModule {}
