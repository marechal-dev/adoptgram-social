import { Cpf } from '@Domain/social-network/enterprise/entities/value-objects/cpf';
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
import { CommonUserFactory } from '@Testing/factories/common-user-factory';
import request from 'supertest';

describe('Fetch Many Common Users Controller E2E Test Suit', () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let administratorFactory: AdministratorFactory;
  let commonUserFactory: CommonUserFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdministratorFactory, CommonUserFactory],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    administratorFactory = moduleRef.get(AdministratorFactory);
    commonUserFactory = moduleRef.get(CommonUserFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[GET] /api/common-users', async () => {
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
      commonUserFactory.make({
        name: 'Common User 1',
        cpf: Cpf.create('049.000.350-84'),
      }),
      commonUserFactory.make({
        name: 'Common User 2',
        cpf: Cpf.create('049.000.350-85'),
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get('/common-users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({
            name: 'Common User 1',
          }),
          expect.objectContaining({
            name: 'Common User 2',
          }),
        ]),
        hasNextPage: false,
      }),
    );
  });
});
