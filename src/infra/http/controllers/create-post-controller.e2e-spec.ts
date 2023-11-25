import { Cnpj } from '@Domain/social-network/enterprise/entities/value-objects/cnpj';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { AppModule } from '@Infra/app.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { PostFactory } from '@Testing/factories/post-factory';
import request from 'supertest';

describe('Create Post Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
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
    prisma = moduleRef.get(PrismaService);
    prismaOrganizationFactory = moduleRef.get(PrismaOrganizationFactory);
    prismaPostFactory = moduleRef.get(PostFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[POST] /api/posts', async () => {
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

    const response = await request(app.getHttpServer())
      .post(`/posts`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        textContent: faker.lorem.paragraph(),
        mediasMetadatas: [
          {
            url: faker.internet.url(),
            type: 'Image',
          },
          {
            url: faker.internet.url(),
            type: 'Image',
          },
        ],
      });

    expect(response.statusCode).toEqual(201);
  });

  test('[POST] /api/posts (400)', async () => {
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
      .post(`/posts`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        textContent: faker.lorem.paragraph(),
        mediasMetadatas: [],
      });

    expect(response.statusCode).toEqual(400);
  });
});
