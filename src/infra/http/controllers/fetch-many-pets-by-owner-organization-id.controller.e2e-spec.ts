import { AppModule } from '@Infra/app.module';
import { DatabaseModule } from '@Infra/database/database.module';
import { PrismaService } from '@Infra/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { CommonUserFactory } from '@Testing/factories/common-user-factory';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import { PrismaPetFactory } from '@Testing/factories/pet-factory';
import request from 'supertest';

describe('Fetch Many Pets by Owner Organization Controller E2E Test Suite', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let primsaCommonUserFactory: CommonUserFactory;
  let prismaOrganizationFactory: PrismaOrganizationFactory;
  let prismaPetFactory: PrismaPetFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        PrismaOrganizationFactory,
        PrismaPetFactory,
        CommonUserFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    prismaOrganizationFactory = moduleRef.get(PrismaOrganizationFactory);
    primsaCommonUserFactory = moduleRef.get(CommonUserFactory);
    prismaPetFactory = moduleRef.get(PrismaPetFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[GET] /api/organizations/:id/pets', async () => {
    const commonUser = await primsaCommonUserFactory.make({
      username: 'john-doe',
      email: 'johndoe@example.com',
    });

    const organization = await prismaOrganizationFactory.makePrismaOrganization(
      {
        username: 'lambeijos-de-luz',
        email: 'lambeijos@gmail.com',
      },
    );

    await prismaPetFactory.make({
      name: 'Bolt',
      ownerOrganizationID: organization.id,
    });
    await prismaPetFactory.make({
      name: 'Bolinha',
      ownerOrganizationID: organization.id,
    });

    const accessToken = await jwt.signAsync({
      sub: commonUser.id.toString(),
      username: 'john-doe',
      email: 'johndoe@example.com',
      kind: 'CommonUser',
    });

    const response = await request(app.getHttpServer())
      .get(`/organizations/${organization.id.toString()}/pets`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Bolt',
        }),
        expect.objectContaining({
          name: 'Bolinha',
        }),
      ]),
    );
  });
});
