import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '@Infra/app.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

describe('Delete Organization Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let prismaOrganizationFactory: PrismaOrganizationFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PrismaOrganizationFactory],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    prismaOrganizationFactory = moduleRef.get(PrismaOrganizationFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[DELETE] /api/organizations/:id', async () => {
    const passwordRaw = 'Test1234!';
    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        title: 'Lambeijos de Luz',
        username: 'lambeijosrg',
        email: 'lambeijos@gmail.com',
        password: await hash(passwordRaw, 10),
      },
    );

    const accessToken = await jwt.signAsync({
      sub: organization.id.toString(),
      username: 'lambeijosrg',
      email: 'lambeijos@gmail.com',
      kind: 'Organization',
    });

    const response = await request(app.getHttpServer())
      .delete(`/organizations/${organization.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
