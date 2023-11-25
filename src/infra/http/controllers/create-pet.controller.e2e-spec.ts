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
import request from 'supertest';

describe('Create Pet Controller E2E Test Suite', () => {
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

  test('[POST] /api/pets', async () => {
    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijos-de-luz',
        email: 'lambeijos@gmail.com',
      },
    );

    const accessToken = await jwt.signAsync({
      sub: organization.id.toString(),
      username: 'lambeijos-de-luz',
      email: 'lambeijos@gmail.com',
      kind: 'Organization',
    });

    const response = await request(app.getHttpServer())
      .post(`/pets`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Bolt',
        age: 8,
        bio: 'Sou um amigão muito querido :D',
        energyLevel: 'Medium',
        isCastrated: false,
        isVaccinated: true,
        requireMedicalAttention: false,
        size: 'Medium',
        ownerOrganizationID: organization.id.toString(),
      });

    expect(response.statusCode).toEqual(201);
  });
});
