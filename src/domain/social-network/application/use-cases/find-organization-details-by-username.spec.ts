import { MediasList } from '@Domain/social-network/enterprise/entities/medias-list';
import { makeCommonUser } from '@Testing/factories/common-user-factory';
import { makeFollow } from '@Testing/factories/follow-factory';
import { makeMedia } from '@Testing/factories/media-factory';
import { makeOrganization } from '@Testing/factories/organization-factory';
import { makePet } from '@Testing/factories/pet-factory';
import { makePost } from '@Testing/factories/post-factory';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { InMemoryFollowsRepository } from '@Testing/repositories/in-memory-follows-repository';
import { InMemoryMediasRepository } from '@Testing/repositories/in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';
import { InMemoryPostsRepository } from '@Testing/repositories/in-memory-posts-repository';

import { FindOrganizationDetailsByUsernameUseCase } from './find-organization-details-by-username';

let inMemoryFollowsRepository: InMemoryFollowsRepository;
let inMemoryMediasRepository: InMemoryMediasRepository;
let inMemoryPostsRepository: InMemoryPostsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let systemUnderTest: FindOrganizationDetailsByUsernameUseCase;

describe('Find Organization Details By Username Test Suite', () => {
  beforeEach(() => {
    inMemoryFollowsRepository = new InMemoryFollowsRepository();
    inMemoryMediasRepository = new InMemoryMediasRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryMediasRepository,
      inMemoryOrganizationsRepository,
    );
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository(
      inMemoryFollowsRepository,
      inMemoryPostsRepository,
      inMemoryPetsRepository,
    );

    inMemoryPostsRepository.inMemoryOrganizationsRepository =
      inMemoryOrganizationsRepository;

    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    systemUnderTest = new FindOrganizationDetailsByUsernameUseCase(
      inMemoryOrganizationsRepository,
    );
  });

  it("should be able to fetch an existent organization details by it's Username", async () => {
    const commonUser = makeCommonUser();
    const organization = makeOrganization({
      title: 'Lambeijos de Luz',
    });

    await inMemoryCommonUsersRepository.create(commonUser);
    await inMemoryOrganizationsRepository.create(organization);

    await inMemoryFollowsRepository.create(
      makeFollow({
        commonUserID: commonUser.id,
        organizationID: organization.id,
      }),
    );

    const post = makePost({
      organizationID: organization.id,
    });

    const mediasList = new MediasList([
      makeMedia({
        postID: post.id,
      }),
      makeMedia({
        postID: post.id,
      }),
    ]);

    post.medias = mediasList;

    await inMemoryPostsRepository.create(post);

    const pet = makePet({
      ownerOrganizationID: organization.id,
    });

    await inMemoryPetsRepository.create(pet);

    const result = await systemUnderTest.execute({
      username: organization.username,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.organizationDetails.followersCount).toEqual(1);
      expect(result.value.organizationDetails.posts).toHaveLength(1);
      expect(result.value.organizationDetails.posts[0].medias).toHaveLength(2);
      expect(result.value.organizationDetails.availablePets).toHaveLength(1);
    }
  });
});
