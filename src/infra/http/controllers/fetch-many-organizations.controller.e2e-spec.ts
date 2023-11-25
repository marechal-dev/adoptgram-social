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
import { AdministratorFactory } from '@Testing/factories/administrator-factory';
import { PrismaOrganizationFactory } from '@Testing/factories/organization-factory';
import request from 'supertest';

describe('Fetch Many Organizations Controller E2E Test Suit', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let administratorFactory: AdministratorFactory;
  let organizationFactory: PrismaOrganizationFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory, PrismaOrganizationFactory],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    administratorFactory = moduleRef.get(AdministratorFactory);
    organizationFactory = moduleRef.get(PrismaOrganizationFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[GET] /api/organizations', async () => {
    const admin = await administratorFactory.make({
      username: 'john-doe',
      email: 'johndoe@example.com',
    });

    const accessToken = await jwt.signAsync({
      sub: admin.id.toString(),
      username: 'john-doe',
      email: 'johndoe@example.com',
      kind: 'Admin',
    });

    await Promise.all([
      organizationFactory.makePrismaOrganization({
        title: 'Org 1',
        cnpj: Cnpj.create('00.000.000/0001-00'),
      }),
      organizationFactory.makePrismaOrganization({
        title: 'Org 2',
        cnpj: Cnpj.create('00.000.000/0001-02'),
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get('/organizations')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({
            title: 'Org 1',
          }),
          expect.objectContaining({
            title: 'Org 2',
          }),
        ]),
        hasNextPage: false,
      }),
    );
  });
});
