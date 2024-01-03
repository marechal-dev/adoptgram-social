import { PostsRepository } from '@Domain/social-network/application/repositories/posts-repository';
import { Cnpj } from '@Domain/social-network/enterprise/entities/value-objects/cnpj';
import { AppModule } from '@Infra/app.module';
import { CacheRepository } from '@Infra/cache/cache-repository';
import { CacheModule } from '@Infra/cache/cache.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { JwtService } from '@nestjs/jwt';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { MediaFactory } from '@Testing/factories/media-factory';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { makePost, PostFactory } from '@Testing/factories/post-factory';

describe('Prisma Posts Repository E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prismaOrganizationFactory: PrismaOrganizationFactory;
  let prismaPostFactory: PostFactory;
  let prismaMediaFactory: MediaFactory;
  let jwt: JwtService;
  let postsRepository: PostsRepository;
  let cacheRepository: CacheRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [PrismaOrganizationFactory, PostFactory, MediaFactory],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prismaOrganizationFactory = moduleRef.get(PrismaOrganizationFactory);
    prismaPostFactory = moduleRef.get(PostFactory);
    prismaMediaFactory = moduleRef.get(MediaFactory);
    jwt = moduleRef.get(JwtService);
    postsRepository = moduleRef.get(PostsRepository);
    cacheRepository = moduleRef.get(CacheRepository);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    vi.useFakeTimers();
  });

  afterAll(async () => {
    vi.useRealTimers();

    await app.close();
  });

  it('should cache timeline posts', async () => {
    const systemTimeForTest = new Date(2023, 10, 25, 15, 40);
    vi.setSystemTime(systemTimeForTest);

    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijos-de-luz',
        email: 'lambeijos@gmail.com',
        cnpj: Cnpj.create('12.023.034/0001-00'),
      },
    );

    const post1 = await prismaPostFactory.make({
      organizationID: organization.id,
      createdAt: new Date(2023, 10, 25, 15, 35),
    });

    const post2 = await prismaPostFactory.make({
      organizationID: organization.id,
      createdAt: new Date(2023, 10, 25, 15, 30),
    });

    await prismaPostFactory.make({
      organizationID: organization.id,
      createdAt: new Date(2023, 10, 23),
    });

    await Promise.all([
      prismaMediaFactory.make({
        postID: post1.id,
      }),
      prismaMediaFactory.make({
        postID: post1.id,
      }),
      prismaMediaFactory.make({
        postID: post2.id,
      }),
      prismaMediaFactory.make({
        postID: post2.id,
      }),
    ]);

    const timelinePosts = await postsRepository.fetchManyRecent();

    const cached = await cacheRepository.get('timeline');

    expect(cached).toEqual(JSON.stringify(timelinePosts));
  });

  it('should return cached timeline posts on subsequent calls', async () => {
    const systemTimeForTest = new Date(2023, 10, 25, 15, 40);
    vi.setSystemTime(systemTimeForTest);

    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijos-de-luz1',
        email: 'lambeijos1@gmail.com',
        cnpj: Cnpj.create('12.123.234/0001-00'),
      },
    );

    const post1 = await prismaPostFactory.make({
      organizationID: organization.id,
      createdAt: new Date(2023, 10, 25, 15, 35),
    });

    const post2 = await prismaPostFactory.make({
      organizationID: organization.id,
      createdAt: new Date(2023, 10, 25, 15, 30),
    });

    await prismaPostFactory.make({
      organizationID: organization.id,
      createdAt: new Date(2023, 10, 23),
    });

    await Promise.all([
      prismaMediaFactory.make({
        postID: post1.id,
      }),
      prismaMediaFactory.make({
        postID: post1.id,
      }),
      prismaMediaFactory.make({
        postID: post2.id,
      }),
      prismaMediaFactory.make({
        postID: post2.id,
      }),
    ]);

    await cacheRepository.set(
      'timeline',
      JSON.stringify({
        timeline: true,
      }),
    );

    const timelinePosts = await postsRepository.fetchManyRecent();

    expect(timelinePosts).toEqual({
      timeline: true,
    });
  });

  it('should reset timeline posts cache when creating a new post', async () => {
    const systemTimeForTest = new Date(2023, 10, 25, 15, 40);
    vi.setSystemTime(systemTimeForTest);

    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijos-de-luz2',
        email: 'lambeijos2@gmail.com',
        cnpj: Cnpj.create('23.023.034/0001-00'),
      },
    );

    const post1 = makePost({
      organizationID: organization.id,
      createdAt: new Date(2023, 10, 25, 15, 35),
    });

    await cacheRepository.set(
      'timeline',
      JSON.stringify({
        timeline: true,
      }),
    );

    await postsRepository.create(post1);

    const cached = await cacheRepository.get('timeline');

    expect(cached).toBeNull();
  });

  it('should reset timeline posts cache when deleting a post', async () => {
    const systemTimeForTest = new Date(2023, 10, 25, 15, 40);
    vi.setSystemTime(systemTimeForTest);

    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijos-de-luz3',
        email: 'lambeijos3@gmail.com',
        cnpj: Cnpj.create('23.235.034/0001-00'),
      },
    );

    const post1 = await prismaPostFactory.make({
      organizationID: organization.id,
      createdAt: new Date(2023, 10, 25, 15, 35),
    });

    await cacheRepository.set(
      'timeline',
      JSON.stringify({
        timeline: true,
      }),
    );

    await postsRepository.delete(post1.id.toString());

    const cached = await cacheRepository.get('timeline');

    expect(cached).toBeNull();
  });
});
