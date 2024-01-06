import { makeOrganization } from '@Testing/factories/organization-factory';
import { makePost } from '@Testing/factories/post-factory';
import { InMemoryCommentsRepository } from '@Testing/repositories/in-memory-comments-repository';
import { InMemoryCommonUsersRepository } from '@Testing/repositories/in-memory-common-users-repository';
import { InMemoryFollowsRepository } from '@Testing/repositories/in-memory-follows-repository';
import { InMemoryMediasRepository } from '@Testing/repositories/in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@Testing/repositories/in-memory-pets-repository';
import { InMemoryPostsRepository } from '@Testing/repositories/in-memory-posts-repository';

import { FindPostDetailsByIdUseCase } from './find-post-details-by-id';

let inMemoryMediasRepository: InMemoryMediasRepository;
let inMemoryFollowsRepository: InMemoryFollowsRepository;
let inMemoryCommentsRepository: InMemoryCommentsRepository;
let inMemoryCommonUsersRepository: InMemoryCommonUsersRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryPostsRepository: InMemoryPostsRepository;
let systemUnderTest: FindPostDetailsByIdUseCase;

describe('Find Post Details By ID Test Suite', () => {
  beforeEach(() => {
    inMemoryMediasRepository = new InMemoryMediasRepository();
    inMemoryFollowsRepository = new InMemoryFollowsRepository();
    inMemoryCommonUsersRepository = new InMemoryCommonUsersRepository();
    inMemoryCommentsRepository = new InMemoryCommentsRepository(
      inMemoryCommonUsersRepository,
    );
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryMediasRepository,
      inMemoryOrganizationsRepository,
      inMemoryCommentsRepository,
    );
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository(
      inMemoryFollowsRepository,
      inMemoryPostsRepository,
      inMemoryPetsRepository,
    );

    inMemoryPostsRepository.inMemoryOrganizationsRepository =
      inMemoryOrganizationsRepository;

    systemUnderTest = new FindPostDetailsByIdUseCase(inMemoryPostsRepository);
  });

  it('should be able to fetch an existent Post with theirs details by ID', async () => {
    const organization = makeOrganization({
      username: 'lambeijos',
    });

    await inMemoryOrganizationsRepository.create(organization);

    const post = makePost({
      organizationID: organization.id,
      textContent: 'Test test',
    });

    await inMemoryPostsRepository.create(post);

    const result = await systemUnderTest.execute({
      id: post.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.post.textContent).toEqual('Test test');
    }
  });
});
