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
import { CommentFactory } from '@Testing/factories/comment-factory';
import { CommonUserFactory } from '@Testing/factories/common-user-factory';
import { MediaFactory } from '@Testing/factories/media-factory';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { PostFactory } from '@Testing/factories/post-factory';
import request from 'supertest';

describe('Find Post Details by ID Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let organizationFactory: PrismaOrganizationFactory;
  let postFactory: PostFactory;
  let mediaFactory: MediaFactory;
  let commentFactory: CommentFactory;
  let commonUserFactory: CommonUserFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        PrismaOrganizationFactory,
        PostFactory,
        MediaFactory,
        CommentFactory,
        CommonUserFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    organizationFactory = moduleRef.get(PrismaOrganizationFactory);
    postFactory = moduleRef.get(PostFactory);
    mediaFactory = moduleRef.get(MediaFactory);
    commentFactory = moduleRef.get(CommentFactory);
    commonUserFactory = moduleRef.get(CommonUserFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[GET] /api/posts/:id/details', async () => {
    const organization = await organizationFactory.makePrismaOrganization({
      username: 'lambeijos-de-luz-2',
      email: 'lambeijos23@gmail.com',
      cnpj: Cnpj.create('13.123.434/0001-00'),
    });

    const user = await commonUserFactory.make();

    const accessToken = await jwt.signAsync({
      sub: organization.id.toString(),
      username: 'lambeijos-de-luz-2',
      email: 'lambeijos23@gmail.com',
      kind: 'Organization',
    });

    const post = await postFactory.make({
      organizationID: organization.id,
    });

    const [media1, media2] = await Promise.all([
      mediaFactory.make({
        postID: post.id,
      }),
      mediaFactory.make({
        postID: post.id,
      }),
    ]);

    const comment = await commentFactory.make({
      creatorID: user.id,
      postID: post.id,
    });

    const response = await request(app.getHttpServer())
      .get(`/posts/${post.id.toString()}/details`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
