import { Module } from '@nestjs/common';

import { AuthenticateCommonUserUseCase } from '@Domain/social-network/application/use-cases/authenticate-common-user';
import { AuthenticateOrganizationUseCase } from '@Domain/social-network/application/use-cases/authenticate-organization';
import { CreatePetUseCase } from '@Domain/social-network/application/use-cases/create-pet';
import { FetchManyPetsByOwnerOrganizationIdUseCase } from '@Domain/social-network/application/use-cases/fetch-many-pets-by-owner-organization-id';
import { FindOrganizationByIdUseCase } from '@Domain/social-network/application/use-cases/find-organization-by-id';
import { FollowOrganizationUseCase } from '@Domain/social-network/application/use-cases/follow-organization';
import { RegisterCommonUserUseCase } from '@Domain/social-network/application/use-cases/register-common-user';
import { RegisterOrganizationUseCase } from '@Domain/social-network/application/use-cases/register-organization';
import { UnfollowOrganizationUseCase } from '@Domain/social-network/application/use-cases/unfollow-organization';
import { CryptographyModule } from '@Infra/cryptography/cryptography.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { AuthenticateCommonUserController } from './controllers/authenticate-common-user.controller';
import { AuthenticateOrganizationController } from './controllers/authenticate-organization.controller';
import { CreatePetController } from './controllers/create-pet.controller';
import { FetchManyPetsByOwnerOrganizationIdController } from './controllers/fetch-many-pets-by-owner-organization-id.controller';
import { FindOrganizationByIdController } from './controllers/find-organization-by-id.controller';
import { FollowOrganizationController } from './controllers/follow-organization.controller';
import { RegisterCommonUserController } from './controllers/register-common-user.controller';
import { RegisterOrganizationController } from './controllers/register-organization.controller';
import { UnfollowOrganizationController } from './controllers/unfollow-organization.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateCommonUserController,
    AuthenticateOrganizationController,
    RegisterCommonUserController,
    RegisterOrganizationController,
    FollowOrganizationController,
    UnfollowOrganizationController,
    FindOrganizationByIdController,
    CreatePetController,
    FetchManyPetsByOwnerOrganizationIdController,
  ],
  providers: [
    AuthenticateCommonUserUseCase,
    AuthenticateOrganizationUseCase,
    RegisterCommonUserUseCase,
    RegisterOrganizationUseCase,
    FollowOrganizationUseCase,
    UnfollowOrganizationUseCase,
    FindOrganizationByIdUseCase,
    CreatePetUseCase,
    FetchManyPetsByOwnerOrganizationIdUseCase,
  ],
})
export class HttpModule {}
