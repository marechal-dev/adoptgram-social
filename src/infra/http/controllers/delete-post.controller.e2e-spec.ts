import { Cnpj } from '@Domain/social-network/enterprise/entities/value-objects/cnpj';
import { AppModule } from '@Infra/app.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { JwtService } from '@nestjs/jwt';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { PostFactory } from '@Testing/factories/post-factory';
import request from 'supertest';

describe('Delete Post Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prismaOrganizationFactory: PrismaOrganizationFactory;
  let prismaPostFactory: PostFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PrismaOrganizationFactory, PostFactory],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prismaOrganizationFactory = moduleRef.get(PrismaOrganizationFactory);
    prismaPostFactory = moduleRef.get(PostFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[DELETE] /api/posts/:id', async () => {
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

    const post = await prismaPostFactory.make({
      organizationID: organization.id,
    });

    const response = await request(app.getHttpServer())
      .delete(`/posts/${post.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });

  test('[DELETE] /api/posts/:id (404)', async () => {
    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijos-de-luz-2',
        email: 'lambeijos2@gmail.com',
        cnpj: Cnpj.create('02.003.004/0001-00'),
      },
    );

    const accessToken = await jwt.signAsync({
      sub: organization.id.toString(),
      username: 'lambeijos-de-luz-2',
      email: 'lambeijos2@gmail.com',
      kind: 'Organization',
    });

    const response = await request(app.getHttpServer())
      .post('/posts/12345677654')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(404);
  });
});
