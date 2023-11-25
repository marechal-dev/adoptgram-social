import { makeOrganization } from '@Testing/factories/organization-factory';
import { InMemoryMediasRepository } from '@Testing/repositories/in-memory-medias-repository';
import { InMemoryPostsRepository } from '@Testing/repositories/in-memory-posts-repository';
import { faker } from '@faker-js/faker';
import { CreatePostUseCase } from './create-post';

let inMemoryMediasRepository: InMemoryMediasRepository;
let inMemoryPostsRepository: InMemoryPostsRepository;
let systemUnderTest: CreatePostUseCase;

describe('Create Post Test Suite', () => {
  beforeEach(() => {
    inMemoryMediasRepository = new InMemoryMediasRepository();
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryMediasRepository,
    );
    systemUnderTest = new CreatePostUseCase(inMemoryPostsRepository);
  });

  it('should be able to create a new Post', async () => {
    const organization = makeOrganization({
      title: 'Lambeijos de Luz',
    });

    const result = await systemUnderTest.execute({
      organizationID: organization.id.toString(),
      mediasMetadatas: [
        {
          type: 'Image',
          url: faker.internet.url(),
        },
        {
          type: 'Video',
          url: faker.internet.url(),
        },
      ],
      textContent: faker.lorem.paragraph(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      const post = result.value.post;

      expect(post.medias.getItems()).toHaveLength(2);
      expect(post.medias.getItems()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'Image',
          }),
          expect.objectContaining({
            type: 'Video',
          }),
        ]),
      );
      expect(post.likes).toEqual(0);
      expect(post.organizationID.toString()).toEqual(
        organization.id.toString(),
      );
    }
  });
});
