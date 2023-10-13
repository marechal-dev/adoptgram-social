import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '@Infra/app.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { PrismaCommonUserFactory } from '@Testing/factories/common-user-factory';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

describe('Follow Organization Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let prismaCommonUserFactory: PrismaCommonUserFactory;
  let prismaOrganizationFactory: PrismaOrganizationFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PrismaCommonUserFactory, PrismaOrganizationFactory],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    prismaCommonUserFactory = moduleRef.get(PrismaCommonUserFactory);
    prismaOrganizationFactory = moduleRef.get(PrismaOrganizationFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[POST] /api/follows/:organizationID/follow', async () => {
    const passwordRaw = 'Test1234!';
    const commonUser = await prismaCommonUserFactory.makePrismaCommonUser({
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: await hash(passwordRaw, 10),
    });
    const organization =
      await prismaOrganizationFactory.makePrismaOrganization();

    const accessToken = await jwt.signAsync({
      sub: commonUser.id.toString(),
      username: 'johndoe',
      email: 'johndoe@example.com',
      kind: 'CommonUser',
    });

    const response = await request(app.getHttpServer())
      .post(`/follows/${organization.id.toString()}/follow`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
  });
});
