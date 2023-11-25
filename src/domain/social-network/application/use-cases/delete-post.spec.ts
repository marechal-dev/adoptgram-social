import { MediasList } from '@Domain/social-network/enterprise/entities/medias-list';
import { makeMedia } from '@Testing/factories/media-factory';
import { makeOrganization } from '@Testing/factories/organization-factory';
import { makePost } from '@Testing/factories/post-factory';
import { InMemoryMediasRepository } from '@Testing/repositories/in-memory-medias-repository';
import { InMemoryPostsRepository } from '@Testing/repositories/in-memory-posts-repository';

import { DeletePostUseCase } from './delete-post';
import { PostNotFoundException } from './exceptions/post-not-found-exception';

let inMemoryMediasRepository: InMemoryMediasRepository;
let inMemoryPostsRepository: InMemoryPostsRepository;
let systemUnderTest: DeletePostUseCase;

describe('Delete Post Test Suite', () => {
  beforeEach(() => {
    inMemoryMediasRepository = new InMemoryMediasRepository();
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryMediasRepository,
    );
    systemUnderTest = new DeletePostUseCase(inMemoryPostsRepository);
  });

  it('should be able to delete a Post', async () => {
    const organization = makeOrganization({
      title: 'Lambeijos de Luz',
    });

    const media1 = makeMedia();
    const media2 = makeMedia();
    const mediasList = new MediasList([media1, media2]);

    const post = makePost({
      organizationID: organization.id,
      medias: mediasList,
    });

    inMemoryPostsRepository.create(post);

    const result = await systemUnderTest.execute({
      postID: post.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value).toEqual(null);
    }
  });

  it('should not be able to delete an inexistent Post', async () => {
    const organization = makeOrganization({
      title: 'Lambeijos de Luz',
    });

    const media1 = makeMedia();
    const media2 = makeMedia();
    const mediasList = new MediasList([media1, media2]);

    const post = makePost({
      organizationID: organization.id,
      medias: mediasList,
    });

    const result = await systemUnderTest.execute({
      postID: post.id.toString(),
    });

    expect(result.isLeft()).toBe(true);

    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(PostNotFoundException);
    }
  });
});
