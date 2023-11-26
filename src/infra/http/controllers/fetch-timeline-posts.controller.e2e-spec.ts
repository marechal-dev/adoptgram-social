import { Cnpj } from '@Domain/social-network/enterprise/entities/value-objects/cnpj';
import { AppModule } from '@Infra/app.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { MediaFactory } from '@Testing/factories/media-factory';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { PostFactory } from '@Testing/factories/post-factory';
import request from 'supertest';

describe('Fetch Timeline Posts Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let prismaOrganizationFactory: PrismaOrganizationFactory;
  let prismaPostFactory: PostFactory;
  let prismaMediaFactory: MediaFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PrismaOrganizationFactory, PostFactory, MediaFactory],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    prismaOrganizationFactory = moduleRef.get(PrismaOrganizationFactory);
    prismaPostFactory = moduleRef.get(PostFactory);
    prismaMediaFactory = moduleRef.get(MediaFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    vi.useFakeTimers();
  });

  afterAll(async () => {
    vi.useRealTimers();

    await app.close();
  });

  test('[GET] /api/posts/timeline', async () => {
    const systemTimeForTest = new Date(2023, 10, 25, 15, 40);
    vi.setSystemTime(systemTimeForTest);

    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijos-de-luz',
        email: 'lambeijos@gmail.com',
        cnpj: Cnpj.create('12.023.034/0001-00'),
      },
    );

    const accessToken = await jwt.signAsync({
      sub: organization.id.toString(),
      username: 'lambeijos-de-luz',
      email: 'lambeijos@gmail.com',
      kind: 'Organization',
    });

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

    const [media1, media2, media3, media4] = await Promise.all([
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

    const response = await request(app.getHttpServer())
      .get('/posts/timeline')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.timelinePosts).toHaveLength(2);
    expect(response.body.timelinePosts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: post1.id.toString(),
          organization: expect.objectContaining({
            id: organization.id.toString(),
          }),
          medias: expect.arrayContaining([
            expect.objectContaining({
              id: media1.id.toString(),
            }),
            expect.objectContaining({
              id: media2.id.toString(),
            }),
          ]),
        }),
        expect.objectContaining({
          id: post2.id.toString(),
          organization: expect.objectContaining({
            id: organization.id.toString(),
          }),
          medias: expect.arrayContaining([
            expect.objectContaining({
              id: media3.id.toString(),
            }),
            expect.objectContaining({
              id: media4.id.toString(),
            }),
          ]),
        }),
      ]),
    );
  });
});
