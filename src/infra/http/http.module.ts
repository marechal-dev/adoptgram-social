import { AuthenticateAdministratorUseCase } from '@Domain/social-network/application/use-cases/authenticate-administrator';
import { AuthenticateCommonUserUseCase } from '@Domain/social-network/application/use-cases/authenticate-common-user';
import { AuthenticateOrganizationUseCase } from '@Domain/social-network/application/use-cases/authenticate-organization';
import { CreateCommentUseCase } from '@Domain/social-network/application/use-cases/create-comment';
import { CreatePetUseCase } from '@Domain/social-network/application/use-cases/create-pet';
import { CreatePostUseCase } from '@Domain/social-network/application/use-cases/create-post';
import { DeleteCommonUserUseCase } from '@Domain/social-network/application/use-cases/delete-common-user';
import { DeleteOrganizationUseCase } from '@Domain/social-network/application/use-cases/delete-organization';
import { DeletePetUseCase } from '@Domain/social-network/application/use-cases/delete-pet';
import { DeletePostUseCase } from '@Domain/social-network/application/use-cases/delete-post';
import { FetchManyCommonUsersUseCase } from '@Domain/social-network/application/use-cases/fetch-many-common-users';
import { FetchManyOrganizationsUseCase } from '@Domain/social-network/application/use-cases/fetch-many-organizations';
import { FetchManyPetsByOwnerOrganizationIdUseCase } from '@Domain/social-network/application/use-cases/fetch-many-pets-by-owner-organization-id';
import { FetchTimelinePostsUseCase } from '@Domain/social-network/application/use-cases/fetch-timeline-posts';
import { FindOrganizationByIdUseCase } from '@Domain/social-network/application/use-cases/find-organization-by-id';
import { FindOrganizationDetailsByUsernameUseCase } from '@Domain/social-network/application/use-cases/find-organization-details-by-username';
import { FindPetByIdUseCase } from '@Domain/social-network/application/use-cases/find-pet-by-id';
import { FindPostDetailsByIdUseCase } from '@Domain/social-network/application/use-cases/find-post-details-by-id';
import { FollowOrganizationUseCase } from '@Domain/social-network/application/use-cases/follow-organization';
import { RegisterCommonUserUseCase } from '@Domain/social-network/application/use-cases/register-common-user';
import { RegisterOrganizationUseCase } from '@Domain/social-network/application/use-cases/register-organization';
import { SearchManyOrganizationsUseCase } from '@Domain/social-network/application/use-cases/search-many-organizations';
import { UnfollowOrganizationUseCase } from '@Domain/social-network/application/use-cases/unfollow-organization';
import { CryptographyModule } from '@Infra/cryptography/cryptography.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { Module } from '@nestjs/common';

import { AuthenticateAdministratorController } from './controllers/authenticate-administrator.controller';
import { AuthenticateCommonUserController } from './controllers/authenticate-common-user.controller';
import { AuthenticateOrganizationController } from './controllers/authenticate-organization.controller';
import { CreateCommentController } from './controllers/create-comment.controller';
import { CreatePetController } from './controllers/create-pet.controller';
import { CreatePostController } from './controllers/create-post.controller';
import { DeleteCommonUserController } from './controllers/delete-common-user.controller';
import { DeleteOrganizationController } from './controllers/delete-organization.controller';
import { DeletePetController } from './controllers/delete-pet.controller';
import { DeletePostController } from './controllers/delete-post.controller';
import { FetchManyCommonUsersController } from './controllers/fetch-many-common-users.controller';
import { FetchManyOrganizationsController } from './controllers/fetch-many-organizations.controller';
import { FetchManyPetsByOwnerOrganizationIdController } from './controllers/fetch-many-pets-by-owner-organization-id.controller';
import { FetchTimelinePostsController } from './controllers/fetch-timeline-posts.controller';
import { FindOrganizationByIdController } from './controllers/find-organization-by-id.controller';
import { FindOrganizationDetailsByUsernameController } from './controllers/find-organization-details-by-username.controller';
import { FindPetByIdController } from './controllers/find-pet-by-id.controller';
import { FindPostDetailsByIdController } from './controllers/find-post-details-by-id.controller';
import { FollowOrganizationController } from './controllers/follow-organization.controller';
import { HealthCheckController } from './controllers/health-check.controller';
import { RegisterCommonUserController } from './controllers/register-common-user.controller';
import { RegisterOrganizationController } from './controllers/register-organization.controller';
import { SearchManyOrganizationsController } from './controllers/search-many-organizations.controller';
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
    FindPetByIdController,
    DeletePetController,
    DeleteCommonUserController,
    DeleteOrganizationController,
    AuthenticateAdministratorController,
    FetchManyCommonUsersController,
    FetchManyOrganizationsController,
    CreatePostController,
    DeletePostController,
    FetchTimelinePostsController,
    SearchManyOrganizationsController,
    HealthCheckController,
    FindOrganizationDetailsByUsernameController,
    CreateCommentController,
    FindPostDetailsByIdController,
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
    FindPetByIdUseCase,
    DeletePetUseCase,
    DeleteCommonUserUseCase,
    DeleteOrganizationUseCase,
    AuthenticateAdministratorUseCase,
    FetchManyCommonUsersUseCase,
    FetchManyOrganizationsUseCase,
    FindOrganizationDetailsByUsernameUseCase,
    CreatePostUseCase,
    DeletePostUseCase,
    SearchManyOrganizationsUseCase,
    FetchTimelinePostsUseCase,
    CreateCommentUseCase,
    FindPostDetailsByIdUseCase,
  ],
})
export class HttpModule {}
