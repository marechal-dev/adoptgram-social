import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '@Infra/app.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { CommonUserFactory } from '@Testing/factories/common-user-factory';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { PrismaPetFactory } from '@Testing/factories/pet-factory';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

describe('Delete Pet Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let commonUserFactory: CommonUserFactory;
  let prismaOrganizationFactory: PrismaOrganizationFactory;
  let prismaPetFactory: PrismaPetFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        CommonUserFactory,
        PrismaOrganizationFactory,
        PrismaPetFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    commonUserFactory = moduleRef.get(CommonUserFactory);
    prismaOrganizationFactory = moduleRef.get(PrismaOrganizationFactory);
    prismaPetFactory = moduleRef.get(PrismaPetFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[DELETE] /api/pets/:id', async () => {
    const passwordRaw = 'Test1234!';
    const commonUser = await commonUserFactory.make({
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: await hash(passwordRaw, 10),
    });

    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijosrg',
        email: 'lambeijos@gmail.com',
      },
    );

    const accessToken = await jwt.signAsync({
      sub: organization.id.toString(),
      username: 'lambeijosrg',
      email: 'lambeijos@gmail.com',
      kind: 'Organization',
    });

    const pet = await prismaPetFactory.make({
      ownerOrganizationID: organization.id,
    });

    const response = await request(app.getHttpServer())
      .delete(`/pets/${pet.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});