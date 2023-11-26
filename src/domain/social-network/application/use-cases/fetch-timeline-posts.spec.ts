import { MediasList } from '@Domain/social-network/enterprise/entities/medias-list';
import { faker } from '@faker-js/faker';
import { makeMedia } from '@Testing/factories/media-factory';
import { makeOrganization } from '@Testing/factories/organization-factory';
import { makePost } from '@Testing/factories/post-factory';
import { InMemoryMediasRepository } from '@Testing/repositories/in-memory-medias-repository';
import { InMemoryOrganizationsRepository } from '@Testing/repositories/in-memory-organizations-repository';
import { InMemoryPostsRepository } from '@Testing/repositories/in-memory-posts-repository';

import { FetchTimelinePostsUseCase } from './fetch-timeline-posts';

let inMemoryMediasRepository: InMemoryMediasRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryPostsRepository: InMemoryPostsRepository;
let systemUnderTest: FetchTimelinePostsUseCase;

describe('Fetch Timeline Posts Test Suite', () => {
  beforeEach(() => {
    inMemoryMediasRepository = new InMemoryMediasRepository();
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryMediasRepository,
      inMemoryOrganizationsRepository,
    );
    systemUnderTest = new FetchTimelinePostsUseCase(inMemoryPostsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to fetch Posts created on the last 20 minutes', async () => {
    const testSystemTime = new Date(2023, 10, 25, 15, 40);
    vi.setSystemTime(testSystemTime);

    const organization = makeOrganization({
      title: 'Lambeijos de Luz',
    });

    await inMemoryOrganizationsRepository.create(organization);

    const post1 = makePost({
      organizationID: organization.id,
      textContent: faker.lorem.paragraph(),
      createdAt: new Date(2023, 10, 25, 15, 35),
    });

    const post2 = makePost({
      organizationID: organization.id,
      textContent: faker.lorem.paragraph(),
      createdAt: new Date(2023, 10, 25, 15, 30),
    });

    const post3 = makePost({
      organizationID: organization.id,
      textContent: faker.lorem.paragraph(),
      createdAt: new Date(2023, 10, 23),
    });

    const media1 = makeMedia();
    const media2 = makeMedia();
    const post1MediasList = new MediasList([media1, media2]);

    const media3 = makeMedia();
    const media4 = makeMedia();
    const post2MediasList = new MediasList([media3, media4]);

    post1.medias = post1MediasList;
    post2.medias = post2MediasList;

    await inMemoryPostsRepository.create(post1);
    await inMemoryPostsRepository.create(post2);
    await inMemoryPostsRepository.create(post3);

    const result = await systemUnderTest.execute();

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      const timelinePosts = result.value.timelinePosts;

      expect(timelinePosts).toHaveLength(2);
      expect(timelinePosts[0].createdAt.getTime()).toBeGreaterThan(
        timelinePosts[1].createdAt.getTime(),
      );
    }
  });
});
